import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view';

@Component({
    selector: 'app-racetrack',
    imports: [],
    templateUrl: './racetrack.component.html',
    styleUrl: './racetrack.component.css',
})
export class RacetrackComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer') editorContainer!: ElementRef<HTMLDivElement>;

  private editorView: EditorView | null = null;

  private sampleCode = `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

const numbers = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(numbers));`;

  ngAfterViewInit(): void {
      this.initEditor();
  }

  ngOnDestroy(): void {
      this.editorView?.destroy();
  }

  private initEditor(): void {
      const state = EditorState.create({
          doc: this.sampleCode,
          extensions: [
              lineNumbers(),
              highlightActiveLine(),
              keymap.of(defaultKeymap),
              javascript(),
              oneDark,
              EditorView.theme({
                  '&': { height: '330px' },
                  '.cm-scroller': { overflow: 'auto' },
                  '.cm-content': { fontFamily: 'JetBrains Mono', fontSize: '15px' },
              }),
              EditorState.readOnly.of(false),
          ],
      });

      this.editorView = new EditorView({
          state,
          parent: this.editorContainer.nativeElement,
      });
  }
}
