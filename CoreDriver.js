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
Runtime.CoreDriver = function(__ctx, context)
{
	Runtime.CoreObject.call(this, __ctx);
	this._context = context;
};
Runtime.CoreDriver.prototype = Object.create(Runtime.CoreObject.prototype);
Runtime.CoreDriver.prototype.constructor = Runtime.CoreDriver;
Object.assign(Runtime.CoreDriver.prototype,
{
	/**
	 * Returns context
	 *
	 * @return Context 
	 */
	context: function(__ctx)
	{
		return this._context;
	},
	/**
	 * Start driver
	 */
	startDriver: function(__ctx)
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
			}
			return __async_t.ret_void();
		};
	},
	_init: function(__ctx)
	{
		this._context = null;
		Runtime.CoreObject.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.CoreDriver)
		{
			this._context = o._context;
		}
		Runtime.CoreObject.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "_context")this._context = v;
		else Runtime.CoreObject.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "_context")return this._context;
		return Runtime.CoreObject.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.CoreDriver";
	},
});
Object.assign(Runtime.CoreDriver, Runtime.CoreObject);
Object.assign(Runtime.CoreDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreDriver";
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
			"class_name": "Runtime.CoreDriver",
			"name": "Runtime.CoreDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("_context");
		}
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
});
Runtime.rtl.defClass(Runtime.CoreDriver);