/* eslint-disable no-undef */
const vscode = require("vscode")
const editor = vscode.window.activeTextEditor;
const fetch = require('node-fetch');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {


  let disposable1 = vscode.commands.registerCommand(
    "search-c---error.SearchinStackOverflow",
     async function () {

		const text = editor.document.getText(editor.selection);
		// using stack exchange api to query selected text
		var url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=c++&intitle='+encodeURIComponent(text)+'&site=stackoverflow';
		var res = await fetch(url);
		// storing results in json format
		var json = await res.json();
		// checking if json is even containing any result or is it empty
		if (json == null) return
		// convert so that we can show it on window box
		const articles = json.items.map(article => {
			return {
			label: article.title,
			detail: article.link,
			link: article.link,
			}
		}  )
		// show results
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

		// storing selected text inside text
		const text = editor.document.getText(editor.selection);
		// using github api to query selected text
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
		// using google programmable search engine to fetch results of different queries
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
	
		panel.webview.html = getWebviewContentofgoogle();

    }
  )

  let stackOverflowView = vscode.commands.registerCommand(
	  'search-c---error.GithubResults',()=>{
		//   opening interface for github search engine using google's programmable search element
	const panel = vscode.window.createWebviewPanel('GithubResults',"stackoverflow view",vscode.ViewColumn.Two ,{
		enableScripts:true
	})

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


