"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.CoreStruct = function(__ctx, obj)
{
	Runtime.CoreObject.call(this, __ctx);
	if (obj != null)
	{
		if (!(obj instanceof Runtime.Dict))
		{
			var _Dict = use("Runtime.Dict");
				if (typeof obj == "object") obj = _Dict.from(obj);
		}
		var rtl = use("Runtime.rtl");
			for (var key in obj._map)
			{
				this.assignValue(__ctx, key.substring(1), obj._map[key]);
			}
		this.initData(__ctx, null, obj);
	}
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
};
Runtime.CoreStruct.prototype = Object.create(Runtime.CoreObject.prototype);
Runtime.CoreStruct.prototype.constructor = Runtime.CoreStruct;
Object.assign(Runtime.CoreStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(__ctx, old, changed)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	copy: function(__ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); item._init();
		item = Object.assign(item, this);
		
		var _Dict = use("Runtime.Dict");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map) item["__" + key.substring(1)] = obj._map[key];
		}
		else
		{
			for (var key in obj) item["__" + key] = obj[key];
		}
		
		item.initData(this, obj);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	clone: function(__ctx, fields)
	{
		var obj = new Runtime.Map(__ctx);
		if (fields != null)
		{
			fields.each(__ctx, (__ctx, field_name) => 
			{
				obj.set(__ctx, field_name, this.takeValue(__ctx, field_name));
			});
		}
		else
		{
			return this;
		}
		/* Return object */
		var res = Runtime.rtl.newInstance(__ctx, this.getClassName(__ctx), Runtime.Collection.from([obj.toDict(__ctx)]));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return CoreStruct
	 */
	map: function(__ctx, field_name, f)
	{
		return this.copy(__ctx, (new Runtime.Map(__ctx)).set(__ctx, field_name, f(__ctx, this.takeValue(__ctx, field_name))).toDict(__ctx));
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.CoreStruct)
		{
		}
		Runtime.CoreObject.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		Runtime.CoreObject.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.CoreObject.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.CoreStruct";
	},
});
Object.assign(Runtime.CoreStruct, Runtime.CoreObject);
Object.assign(Runtime.CoreStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(__ctx, items)
	{
		return new (Function.prototype.bind.apply(this, [null, __ctx, items]));
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
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.CoreStruct",
			"name": "Runtime.CoreStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.Interfaces.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.CoreStruct);