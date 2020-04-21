"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.CoreStruct = function(ctx, obj)
{
	Runtime.CoreObject.call(this, ctx);
	this.constructor._assign(ctx, this, null, obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.CoreStruct.prototype = Object.create(Runtime.CoreObject.prototype);
Runtime.CoreStruct.prototype.constructor = Runtime.CoreStruct;
Object.assign(Runtime.CoreStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(ctx, old, changed)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		this.constructor._assign(ctx, item, this, obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	clone: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return this;
		}
		var obj = new Runtime.Map(ctx);
		fields.each(ctx, (ctx, field_name) => 
		{
			obj.set(ctx, field_name, this.takeValue(ctx, field_name));
		});
		/* Return object */
		var res = Runtime.rtl.newInstance(ctx, this.getClassName(ctx), Runtime.Collection.from([obj.toDict(ctx)]));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return CoreStruct
	 */
	map: function(ctx, field_name, f)
	{
		return this.copy(ctx, (new Runtime.Map(ctx)).set(ctx, field_name, f(ctx, this.takeValue(ctx, field_name))).toDict(ctx));
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.CoreStruct)
		{
		}
		Runtime.CoreObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.CoreObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.CoreObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.CoreStruct";
	},
});
Object.assign(Runtime.CoreStruct, Runtime.CoreObject);
Object.assign(Runtime.CoreStruct,
{
	/**
	 * Assign
	 */
	_assign: function(ctx, item, old_item, obj)
	{
		if (obj == null)
		{
			item.initData(ctx, old_item, obj);
			return ;
		}
		var _Dict = use("Runtime.Dict");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map) item[key.substring(1)] = obj._map[key];
		}
		else
		{
			for (var key in obj) item[key] = obj[key];
		}
		
		item.initData(ctx, old_item, obj);
	},
	/**
	 * Returns new instance
	 */
	newInstance: function(ctx, items)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, items]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.CoreStruct",
			"name": "Runtime.CoreStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.Interfaces.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.CoreStruct);