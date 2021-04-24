/* eslint-disable no-undef */
const vscode = require("vscode")
const editor = vscode.window.activeTextEditor;
const term = vscode.window.activeTerminal;
// const cons_ed = vscode.window.activeDebugConsole;
const fetch = require('node-fetch');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {


  let disposable1 = vscode.commands.registerCommand(
    "search-c---error.SearchinStackOverflow",
     async function () {

		const text = editor.document.getText(editor.selection);
		// const text1 = vscode.debug.activeDebugConsole.document.getText(vscode.debug.activeDebugConsole.items);
		// vscode.debug.activeDebugConsole.document.getText
		// var url = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&accepted=True&answers=1&site=stackoverflow';
		var url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=c++&intitle='+encodeURIComponent(text)+'&site=stackoverflow';
		//url += '&q=' + encodeURIComponent(text);
		//url += '&tagged=' + encodeURIComponent("c++");
		var res = await fetch(url);
		var json = await res.json();
		console.log(json);
		// if (vscode.window.activeTerminal !== undefined) {
		// 	console.log(vscode.window.activeTerminal.document.getText());
		// } else {
		// 	console.log("no terminal");
		// }
		// console.log(vscode.debug.activeDebugConsole.items)
		// const articles = json.items.map(article => {
		// 	return {
		// 	label: article.title,
		// 	detail: article.link,
		// 	link: article.link,
		// 	}
		// }  )
		// const panel = vscode.window.createWebviewPanel('stack',"stackoverflow view",vscode.ViewColumn.Two ,{
		// 	enableScripts:true
		// })
	
	
		// panel.webview.html = getWebviewContentofstackoverflow( articles );




		if (json == null) return
		const articles = json.items.map(article => {
			return {
			label: article.title,
			detail: article.link,
			link: article.link,
			}
		}  )

      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      })

      	if (article == null) return
      	vscode.env.openExternal(article.link)
		console.log(json.items);	 

    }
  )

  let disposable2 = vscode.commands.registerCommand(
    "search-c---error.SearchinGithub",
     async function () {

		const text = editor.document.getText(editor.selection);
		var url = 'https://api.github.com/search/repositories?sort=stars&order=desc&q='+encodeURIComponent(text)+'language:c%2B%2B';
		
		var res = await fetch(url);
		var json = await res.json();
		console.log(json);
		if (json == null) return
		const articles = json.items.map(article => {
			return {
			label: article.description,
			detail: article.html_url,
			link: article.html_url,
			}
		}  )

      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      })

      	if (article == null) return
      	vscode.env.openExternal(article.link)
		console.log(json.items);	 

    }
  )
  
  let disposable3 = vscode.commands.registerCommand(
    "search-c---error.SearchinCppreference",
     async function () {

		const text = editor.document.getText(editor.selection);
		var url = 'http://api.serpstack.com/search?access_key=9bd922f9fff3d690c46a4efbdd37b1fc&query='+encodeURIComponent(text)+'+in+cppreference';
		
		var res = await fetch(url);
		var json = await res.json();
		
		if (json == null) return;
		console.log(json.organic_results);
		const articles = json.organic_results.map(article => {
			return {
			label: article.title,
			detail: article.url,
			link: article.url,
			}
		}  )
    //   const article = await vscode.window.showQuickPick(articles, {
    //     matchOnDetail: true,
    //   })

	console.log(articles);
	if (articles == null) return
	  let article;
	  if(articles.length > 0){
		article = articles[0];
	  }
      	if (article == null) return
      	vscode.env.openExternal(article.link)
		console.log(json.items);	 

    }
  )

  let disposable4 = vscode.commands.registerCommand(
    "search-c---error.SearchinGoogle",
     async function () {
		const panel = vscode.window.createWebviewPanel('stack',"stackoverflow view",vscode.ViewColumn.Two ,{
			enableScripts:true
		})
	
		// console.log(view.getView())
	
		panel.webview.html = getWebviewContentofgoogle();

    }
  )

  let stackOverflowView = vscode.commands.registerCommand(
	  'search-c---error.GithubResults',()=>{
	const panel = vscode.window.createWebviewPanel('GithubResults',"stackoverflow view",vscode.ViewColumn.Two ,{
		enableScripts:true
	})

	// console.log(view.getView())

	panel.webview.html = getWebviewContentofgithub();

})




  context.subscriptions.push(stackOverflowView);
  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
  context.subscriptions.push(disposable3)
  context.subscriptions.push(disposable4)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}

function getWebviewContentofgithub( ) {
	return `<!DOCTYPE html>
	<html>
		<head>
			<title>SearchBar</title>
			<style>
				body {
					
				}
			</style>
		</head>
		<body>
			<h1 style="text-align: center;">Github</h1>
			<script async src="https://cse.google.com/cse.js?cx=4cd426893c80efd6d"></script>
<div class="gcse-search"></div>
		</body>
	</html>`;
  }


function getWebviewContentofgoogle( ) {
	return `<!DOCTYPE html>
	<html>
		<head>
			<title>SearchBar</title>
			<style>
				body {
					
				}
			</style>
		</head>
		<body>
			<h1 style="text-align: center;">Google</h1>
			<script async src=
	"https://cse.google.com/cse.js?cx=000888210889775888983:y9tkcjel090">
			</script>
			<div class="gcse-search"></div>
		</body>
	</html>`;
  }



  
// function getWebviewContentofstackoverflow( article ) {
// 	console.log(article[0]);
// 	return `<!DOCTYPE html>
// 	<html>
// 		<head>
// 			<title>SearchBar</title>
// 			<style>
// 				body {
					
// 				}
// 			</style>
// 		</head>
// 		<body>
// 			<h1 style="text-align: center;">StackOverflow</h1>
// 			<p>Results:</p>
// 			<ul>
// 				<li>${article[0].label}</li>
// 				<li><a href="${article[0].link}">${article[0].link}</a></p></li>
// 			</ul>
			
// 		</body>
// 	</html>`;
//   }


  