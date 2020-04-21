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
Runtime.CoreObject = function(ctx)
{
	this._init(ctx);
};
Object.assign(Runtime.CoreObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function(ctx)
	{
	},
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	get: function(ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
		return this.takeValue(ctx, variable_name, default_value);
	},
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeValue: function(ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
		return this.takeVirtualValue(ctx, variable_name, default_value);
	},
	/**
	 * Returns virtual values
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeVirtualValue: function(ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
		return default_value;
	},
	/**
	 * Set new value
	 * @param string variable_name
	 * @param var value
	 */
	assignValue: function(ctx, variable_name, value)
	{
		this.assignVirtualValue(ctx, variable_name, value);
	},
	/**
	 * Assign virtual value
	 * @param string variable_name
	 * @param var value
	 */
	assignVirtualValue: function(ctx, variable_name, value)
	{
	},
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject: function(ctx, obj)
	{
	},
	/**
	 * Set new values instance by Map
	 * @param Map<var> map
	 * @return CoreObject
	 */
	assignDict: function(ctx, values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		var f = Runtime.rtl.method("Runtime.RuntimeUtils", "getVariablesNames");
		var names = f(ctx, this.getClassName(ctx), 2);
		for (var i = 0;i < names.count(ctx);i++)
		{
			var name = names.item(ctx, i);
			this.assignValue(ctx, name, values.get(ctx, name, null));
		}
		return this;
	},
	/**
	 * Set new values instance by Map
	 * @param Dict<var> map
	 * @return CoreObject
	 */
	setDict: function(ctx, values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		values.each(ctx, (ctx, v, k) => 
		{
			return this.assignValue(ctx, k, v);
		});
		return this;
	},
	/**
	 * Dump serializable object to Map
	 * @return Map<var>
	 */
	takeDict: function(ctx, fields, flag)
	{
		if (fields == undefined) fields = null;
		if (flag == undefined) flag = 2;
		var values = new Runtime.Map(ctx);
		if (fields == null)
		{
			var f = Runtime.rtl.method(ctx, "Runtime.RuntimeUtils", "getVariablesNames");
			var names = f(ctx, this.getClassName(ctx), flag);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var name = names.item(ctx, i);
				values.set(ctx, name, this.takeValue(ctx, name, null));
			}
		}
		else
		{
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var name = fields.item(ctx, i);
				values.set(ctx, name, this.takeValue(ctx, name, null));
			}
		}
		return values.toDict(ctx);
	},
	staticMethod: function(method_name)
	{
		return Runtime.rtl.method(null, this.getClassName(), method_name);
	},
	callStatic: function(ctx, method_name)
	{
		return null;
	},
	callStaticParent: function(ctx, method_name)
	{
		return null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.CoreObject)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.CoreObject";
	},
});
Object.assign(Runtime.CoreObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.CoreObject",
			"name": "Runtime.CoreObject",
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
});
Runtime.rtl.defClass(Runtime.CoreObject);