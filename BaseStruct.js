"use strict;"
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
Runtime.BaseStruct = function(obj)
{
	if (obj == undefined) obj = null;
	Runtime.BaseObject.call(this);
	this.constructor._assign(this, null, obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		this.constructor._assign(item, this, obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		return this.copy(obj);
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return Runtime.Dict.from({});
		}
		var obj = new Runtime.Map();
		fields.each((field_name) => 
		{
			obj.setValue(field_name, this.takeValue(field_name));
		});
		/* Return object */
		var res = Runtime.rtl.newInstance(this.getClassName(), Runtime.Collection.from([obj.toDict()]));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return BaseStruct
	 */
	map: function(field_name, f)
	{
		return this.copy((new Runtime.Map()).setValue(field_name, f(this.takeValue(field_name))).toDict());
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	takeDict: function()
	{
		var values = new Runtime.Map();
		var names = Runtime.rtl.getFields(this.getClassName());
		for (var i = 0;i < names.count();i++)
		{
			var variable_name = names.item(i);
			var value = this.get(variable_name, null);
			values.setValue(variable_name, value);
		}
		return values.toDict();
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	toDict: function()
	{
		return this.takeDict();
	},
	getClassName: function()
	{
		return "Runtime.BaseStruct";
	},
});
Object.assign(Runtime.BaseStruct, Runtime.BaseObject);
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Returns field value
	 */
	_initDataGet: function(old, changed, field_name)
	{
		return (changed != null && changed.has(field_name)) ? (Runtime.rtl.get(changed, field_name)) : (Runtime.rtl.get(old, field_name));
	},
	/**
	 * Init struct data
	 */
	_initData: function(old, changed)
	{
		return changed;
	},
	/**
	 * Assign
	 */
	_assign: function(new_item, old_item, obj)
	{
		obj = Runtime.rtl.convert(obj, "Runtime.Dict");
		obj = new_item.constructor._initData(old_item, obj);
		if (obj == null)
		{
			return ;
		}
		var check_types = false;
		var class_name = new_item.getClassName();
		/* Enable check types */
		check_types = true;
		if (class_name == "Runtime.IntrospectionClass")
		{
			check_types = false;
		}
		if (class_name == "Runtime.IntrospectionInfo")
		{
			check_types = false;
		}
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map)
			{
				var real_key = key.substring(1);
				var value = obj._map[key];
				if (check_types)
				{
					info = rtl.getFieldInfo(class_name, real_key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
					}
				}
				new_item[real_key] = value;
			}
		}
		else
		{
			for (var key in obj)
			{
				var value = obj[key];
				if (check_types)
				{
					info = rtl.getFieldInfo(new_item.getClassName(), key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
					}
				}
				new_item[key] = value;
			}
		}
	},
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return new (Function.prototype.bind.apply(this, (typeof ctx != "undefined") ? [null, ctx, items] : [null, items]));
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	update: function(item, items)
	{
		return item.copy(items);
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	setAttr: function(item, path, value)
	{
		return Runtime.rtl.setAttr(item, path, value);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.BaseStruct);
window["Runtime.BaseStruct"] = Runtime.BaseStruct;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseStruct;
Runtime.BaseStruct.prototype.get = function(k, v)
{ if (v == undefined) v = null; return this[k] != undefined ? this[k] : v; };