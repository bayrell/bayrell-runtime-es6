"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.CoreStruct = class extends Runtime.CoreObject{
	/** 
	 * Constructor
	 */
	constructor(obj){
		if (obj == undefined) obj=null;
		super();
		this.assignMap(obj);
		this.onCreated();
	}
	/**
	 * Struct created 
	 */
	onCreated(){
	}
	/**
	 * Clone this object with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	clone(obj){
		if (obj == undefined) obj=null;
		var instance = Runtime.rtl.newInstance(this.getClassName());
		instance.assignObject(this);
		if (obj != null){
			instance.setMap(obj);
		}
		instance.onCreated();
		return instance;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreStruct";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(Runtime.Interfaces.SerializeInterface);
	}
}
Runtime.CoreStruct.__static_implements__ = [];
Runtime.CoreStruct.__static_implements__.push(Runtime.Interfaces.SerializeInterface)