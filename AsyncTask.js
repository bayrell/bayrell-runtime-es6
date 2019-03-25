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
Runtime.AsyncTask = class extends Runtime.CoreObject{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.AsyncTask";}
	static getCurrentClassName(){return "Runtime.AsyncTask";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		this.pos = null;
		this.f = null;
		this.catch_stack = null;
	}
}