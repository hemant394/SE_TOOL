/* eslint-disable no-undef */
const vscode = require("vscode")
const editor = vscode.window.activeTextEditor;
const term = vscode.window.activeTerminal;
// const cons_ed = vscode.window.activeDebugConsole;
const fetch = require('node-fetch');
// const axios = require("axios")
// const xmlParser = require("fast-xml-parser")

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

  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}