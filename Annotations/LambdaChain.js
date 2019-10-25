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
if (typeof Runtime.Annotations == 'undefined') Runtime.Annotations = {};
Runtime.Annotations.LambdaChain = function(__ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Runtime.Annotations.LambdaChain.prototype = Object.create(Runtime.CoreStruct.prototype);
Runtime.Annotations.LambdaChain.prototype.constructor = Runtime.Annotations.LambdaChain;
Object.assign(Runtime.Annotations.LambdaChain.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__value = "";
		if (a.indexOf("value") == -1) defProp(this, "value");
		this.__chain = "";
		if (a.indexOf("chain") == -1) defProp(this, "chain");
		this.__pos = 0;
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		this.__is_await = false;
		if (a.indexOf("is_await") == -1) defProp(this, "is_await");
		Runtime.CoreStruct.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.Annotations.LambdaChain)
		{
			this.__name = o.__name;
			this.__value = o.__value;
			this.__chain = o.__chain;
			this.__pos = o.__pos;
			this.__is_await = o.__is_await;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "name")this.__name = v;
		else if (k == "value")this.__value = v;
		else if (k == "chain")this.__chain = v;
		else if (k == "pos")this.__pos = v;
		else if (k == "is_await")this.__is_await = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.__name;
		else if (k == "value")return this.__value;
		else if (k == "chain")return this.__chain;
		else if (k == "pos")return this.__pos;
		else if (k == "is_await")return this.__is_await;
		return Runtime.CoreStruct.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Annotations.LambdaChain";
	},
});
Object.assign(Runtime.Annotations.LambdaChain, Runtime.CoreStruct);
Object.assign(Runtime.Annotations.LambdaChain,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.LambdaChain";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": "Runtime.Annotations.LambdaChain",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("name");
			a.push("value");
			a.push("chain");
			a.push("pos");
			a.push("is_await");
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
Runtime.rtl.defClass(Runtime.Annotations.LambdaChain);