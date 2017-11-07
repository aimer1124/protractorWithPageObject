# ProtractorWithPageObject

Protractor with Page Object

# Protractor

```
Protractor is an end-to-end test framework for AngularJS applications. 
Protractor runs tests against your application running in a real browser, interacting with it as a user would.
```

## 是什么
* 基于`Node.js`的程序
* 使用`Jasmine`测试框架测试接口,针对`AngularJS`的应用程序 
* 官网： [http://angular.github.io/protractor/#/](http://angular.github.io/protractor/#/)
* Github: [https://github.com/angular/protractor](https://github.com/angular/protractor)

## 功能
* 模拟真实的用户操作行为
* 针对`AngularJS`中的Element不需要做特殊的处理，普通HTML元素也同样支持
* 智能等待，不需要为页面中的加载和同步显示做特殊的等待时间处理

## 安装
* 安装`Node`和`JDK`
	* Protractor 3支持NodeJS v4以上
	* 使用NodeJS v0.12,需要使用Protractor 2
* 安装`Protractor`: `npm install -g protractor`
	* 此命令会同时安装`protractor`和`webdriver-manager`
	* `webdriver-manager`：为于管理所有的`webdriver`
* 安装`webdriver`: `webdriver-manager update`
	* 此命令会安装和更新`webdriver`,其它命令及用法	
	
	```
	Usage: webdriver-manager <command>
	Commands:
	  update: install or update selected binaries
	  start: start up the selenium server
	  status: list the current available drivers
	  clean: removes all downloaded driver files from the out_dir
	```

#  End2End Testing
## 页面分析-[Page Object](http://martinfowler.com/bliki/PageObject.html)
* 页面地址： [https://www.angularjs.org/](https://www.angularjs.org/)
* 功能
	
	```
	页面中的"The Basics"部分，在右侧的`Name`输入框中输入`Julie`后，下方原有的`Hello !`会变更为`Hello Julie!`
	```
	
* 元素分析
	* `Name`输入框
		* 元素页面源码：`<input type="text" ng-model="yourName" placeholder="Enter a name here" class="ng-valid ng-touched ng-dirty ng-valid-parse ng-empty">`，元素`ng-model`可直接使用Protractor的元素定位方法：`element(by.model('yourName'))`,
	* `文本显示`
		* 元素源码：`<h1 class="ng-binding">Hello !</h1>` ,元素`class="ng-binding"`可直接使用Protractor的元素定位方法：`element(by.binding('yourName'))`
* [Page Object](http://martinfowler.com/bliki/PageObject.html)设计: `AngularHomepage.js`
	
	```
	  var AngularHomepage = function() {
		  var nameInput = element(by.model('yourName'));
		  var greeting = element(by.binding('yourName'));
		
		  this.get = function() {
		    browser.get('http://www.angularjs.org');
		  };
		
		  this.setName = function(name) {
		    nameInput.sendKeys(name);
		  };
		
		  this.getGreeting = function() {
		    return greeting.getText();
		  };
	  };
	  module.exports = AngularHomepage;
	```

## 测试代码：`spec.js`


```	
var pageObject = require('../pageObject/AngularHomepage.js');
	
describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    var angularHomepage = new pageObject();
    angularHomepage.get();
	
    angularHomepage.setName('Julie');
	
    expect(angularHomepage.getGreeting()).toEqual('Hello Julie!');
  });
});
```
	
* `pageObject`: 加载Page Object
* `var angularHomepage = new pageObject();`: 创建一个Page Object对象
* `angularHomepage.get();`: 打问`AngularHomepage`首页，调用`browser.get('http://www.angularjs.org');`
* `angularHomepage.setName('Julie');`: 设置`nameInput`值为`Julie`，调用`nameInput.sendKeys(name);`
* `expect(angularHomepage.getGreeting()).toEqual('Hello Julie!');`: `测试greeting`的值与`Hello Julie!`是否相等，相等则测试`通过`,不相等，则测试`失败`

## 启动`webdriver`
* 启动`webdriver`: `webdriver-manager start`
	* 启动`Selenium Server`
	
	```
	seleniumProcess.pid: 49863
	11:24:51.400 INFO - Launching a standalone Selenium Server
	Setting system property webdriver.chrome.driver to /usr/local/lib/node_modules/protractor/selenium/chromedriver_2.21
	11:24:51.452 INFO - Java: Oracle Corporation 25.60-b23
	11:24:51.452 INFO - OS: Mac OS X 10.11.2 x86_64
	11:24:51.467 INFO - v2.52.0, with Core v2.52.0. Built from revision 4c2593c
	11:24:51.549 INFO - Driver provider org.openqa.selenium.ie.InternetExplorerDriver registration is skipped:
	registration capabilities Capabilities [{ensureCleanSession=true, browserName=internet explorer, version=, platform=WINDOWS}] does not match the current platform MAC
	11:24:51.550 INFO - Driver provider org.openqa.selenium.edge.EdgeDriver registration is skipped:
	registration capabilities Capabilities [{browserName=MicrosoftEdge, version=, platform=WINDOWS}] does not match the current platform MAC
	11:24:51.550 INFO - Driver class not found: com.opera.core.systems.OperaDriver
	11:24:51.550 INFO - Driver provider com.opera.core.systems.OperaDriver is not registered
	11:24:51.656 INFO - RemoteWebDriver instances should connect to: http://127.0.0.1:4444/wd/hub
	11:24:51.656 INFO - Selenium Server is up and running
	```
	
	* 访问：[http://127.0.0.1:4444/wd/hub](http://127.0.0.1:4444/wd/hub)，本地查看是否启动成功
	
## 执行`Protractor`

* 执行`Protractor`: `protractor conf.js`
	* 执行过程中，会`真实`的把浏览器挂起，并显示`真实的页面信息`
	* 执行结束时，会`自动`把浏览器关闭,且`webdriver`日志会记录本次执行过程中的`日志信息`
* `Protractoc`执行过程日志

	```
	[11:32:19] I/hosted - Using the selenium server at http://localhost:4444/wd/hub
	[11:32:19] I/launcher - Running 1 instances of WebDriver
	Started
	.
	
	
	1 spec, 0 failures
	Finished in 5.401 seconds
	[11:32:27] I/launcher - 0 instance(s) of WebDriver still running
	[11:32:27] I/launcher - firefox #01 passed
	```

* `webdriver`启动的`Selenium Server`中也会记录本次请求的相关日志

# 总结

* 以上涉及的源码已提交到Git: [https://github.com/aimer1124/protractorWithPageObject.git](https://github.com/aimer1124/protractorWithPageObject.git),便于查阅
* `Protractor`支持`E2E`测试，特别是针对`AngularJS`的项目
* `Protractor的webdriver-manager`将`webdriver`统一管理，减少测试人员在使用过程中针对`webdriver`的管理操作，将主要精力集中于`E2E`的测试

# 参考

* Protractor Tutorial: [http://angular.github.io/protractor/#/tutorial](http://angular.github.io/protractor/#/tutorial)
* Page Object: [http://martinfowler.com/bliki/PageObject.html](http://martinfowler.com/bliki/PageObject.html)
* Protractor元素定位：[http://angular.github.io/protractor/#/locators](http://angular.github.io/protractor/#/locators)
* Protractor conf配制：[https://github.com/angular/protractor/blob/master/docs/referenceConf.js](https://github.com/angular/protractor/blob/master/docs/referenceConf.js)
* Protractor API: [http://angular.github.io/protractor/#/api?view=ElementArrayFinder](http://angular.github.io/protractor/#/api?view=ElementArrayFinder)
