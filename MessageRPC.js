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
Runtime.MessageRPC = function(ctx)
{
	Runtime.Message.apply(this, arguments);
};
Runtime.MessageRPC.prototype = Object.create(Runtime.Message.prototype);
Runtime.MessageRPC.prototype.constructor = Runtime.MessageRPC;
Object.assign(Runtime.MessageRPC.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.uri = "";
		this.api_name = "";
		this.space_name = "";
		this.method_name = "";
		this.data = null;
		this.code = 0;
		this.error = "";
		this.response = null;
		this.logs = null;
		this.have_result = false;
		Runtime.Message.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.MessageRPC)
		{
			this.uri = o.uri;
			this.api_name = o.api_name;
			this.space_name = o.space_name;
			this.method_name = o.method_name;
			this.data = o.data;
			this.code = o.code;
			this.error = o.error;
			this.response = o.response;
			this.logs = o.logs;
			this.have_result = o.have_result;
		}
		Runtime.Message.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uri")this.uri = v;
		else if (k == "api_name")this.api_name = v;
		else if (k == "space_name")this.space_name = v;
		else if (k == "method_name")this.method_name = v;
		else if (k == "data")this.data = v;
		else if (k == "code")this.code = v;
		else if (k == "error")this.error = v;
		else if (k == "response")this.response = v;
		else if (k == "logs")this.logs = v;
		else if (k == "have_result")this.have_result = v;
		else Runtime.Message.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.uri;
		else if (k == "api_name")return this.api_name;
		else if (k == "space_name")return this.space_name;
		else if (k == "method_name")return this.method_name;
		else if (k == "data")return this.data;
		else if (k == "code")return this.code;
		else if (k == "error")return this.error;
		else if (k == "response")return this.response;
		else if (k == "logs")return this.logs;
		else if (k == "have_result")return this.have_result;
		return Runtime.Message.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.MessageRPC";
	},
});
Object.assign(Runtime.MessageRPC, Runtime.Message);
Object.assign(Runtime.MessageRPC,
{
	/**
	 * Returns true if success
	 * @return bool
	 */
	isSuccess: function(ctx, msg)
	{
		return msg.have_result && msg.code >= Runtime.RuntimeConstant.ERROR_OK;
	},
	/**
	 * Set success result
	 * @param primitive res
	 * @return Message
	 */
	success: function(ctx, msg, response)
	{
		return msg.copy(ctx, Runtime.Dict.from({"code":Runtime.RuntimeConstant.ERROR_OK,"error":"","response":response,"have_result":true}));
	},
	/**
	 * Set fail result
	 * @param primitive res
	 * @return Message
	 */
	fail: function(ctx, msg, response, error, code)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		return msg.copy(ctx, Runtime.Dict.from({"code":code,"error":error,"response":response,"have_result":true}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.MessageRPC";
	},
	getParentClassName: function()
	{
		return "Runtime.Message";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.MessageRPC",
			"name": "Runtime.MessageRPC",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("uri");
			a.push("api_name");
			a.push("space_name");
			a.push("method_name");
			a.push("data");
			a.push("code");
			a.push("error");
			a.push("response");
			a.push("logs");
			a.push("have_result");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "api_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "space_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "logs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "have_result") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
Runtime.rtl.defClass(Runtime.MessageRPC);