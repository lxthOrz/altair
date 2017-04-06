import { Component, OnInit, Input } from '@angular/core';

// Import the codemirror packages
import Codemirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss']
})
export class QueryResultComponent implements OnInit {

  _queryResult = '';
  @Input()
  public set queryResult(val: string){
    this._queryResult = val;
    if (this.codeEditor) {
      console.log(this.codeEditor);
      this.codeEditor.setValue(JSON.stringify(val, null, 2));
      setTimeout(() => this.codeEditor.refresh(), 1);
    }
  }
  codeEditor = null;

  constructor() { }

  ngOnInit() {
    const editorTextArea = document.querySelector('.app-query-result-textarea');
    this.codeEditor = Codemirror.fromTextArea(editorTextArea, {
      mode: 'javascript',
      json: true,
      lineWrapping: true,
      lineNumbers: true,
      foldGutter: true,
      readOnly: true,
      autoRefresh: true,
      theme: 'default query-result',
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
  }
}
