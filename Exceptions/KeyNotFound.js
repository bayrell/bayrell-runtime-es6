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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(__ctx, key, context, prev)
{
	/* RuntimeUtils::translate("ERROR_KEY_NOT_FOUND", null, "", context),  */
	Runtime.Exceptions.RuntimeException.call(this, __ctx, "Key '" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("' not found"), Runtime.RuntimeConstant.ERROR_KEY_NOT_FOUND, context, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.Exceptions.KeyNotFound)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
});
Object.assign(Runtime.Exceptions.KeyNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.KeyNotFound",
			"name": "Runtime.Exceptions.KeyNotFound",
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
});
Runtime.rtl.defClass(Runtime.Exceptions.KeyNotFound);