import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view';
import {
    abcdef,
    abyss,
    androidStudio,
    andromeda,
    basicDark,
    basicLight,
    catppuccinMocha,
    cobalt2,
    forest,
    githubDark,
    githubLight,
    gruvboxDark,
    gruvboxLight,
    highContrastDark,
    highContrastLight,
    materialDark,
    materialLight,
    monokai,
    nord,
    palenight,
    solarizedDark,
    solarizedLight,
    synthwave84,
    tokyoNightDay,
    tokyoNightStorm,
    volcano,
    vsCodeDark,
    vsCodeLight,
} from '@fsegurai/codemirror-theme-bundle';

@Component({
    selector: 'app-racetrack',
    imports: [ CommonModule, FormsModule ],
    templateUrl: './racetrack.component.html',
    styleUrl: './racetrack.component.css',
})
export class RacetrackComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer') editorContainer!: ElementRef<HTMLDivElement>;

  private editorView: EditorView | null = null;
  private themeCompartment = new Compartment();
  private styleCompartment = new Compartment();

  // Theme options
  darkThemes = [
      { name: 'Abcdef', value: 'abcdef' },
      { name: 'Abyss', value: 'abyss' },
      { name: 'Android Studio', value: 'androidStudio' },
      { name: 'Andromeda', value: 'andromeda' },
      { name: 'Basic Dark', value: 'basicDark' },
      { name: 'Catppuccin Mocha', value: 'catppuccinMocha' },
      { name: 'Cobalt2', value: 'cobalt2' },
      { name: 'Forest', value: 'forest' },
      { name: 'GitHub Dark', value: 'githubDark' },
      { name: 'Gruvbox Dark', value: 'gruvboxDark' },
      { name: 'High Contrast Dark', value: 'highContrastDark' },
      { name: 'Material Dark', value: 'materialDark' },
      { name: 'Monokai', value: 'monokai' },
      { name: 'Nord', value: 'nord' },
      { name: 'One Dark', value: 'oneDark' },
      { name: 'Palenight', value: 'palenight' },
      { name: 'Solarized Dark', value: 'solarizedDark' },
      { name: 'Synthwave 84', value: 'synthwave84' },
      { name: 'Tokyo Night Storm', value: 'tokyoNightStorm' },
      { name: 'Volcano', value: 'volcano' },
      { name: 'VS Code Dark', value: 'vsCodeDark' },
  ];

  lightThemes = [
      { name: 'Basic Light', value: 'basicLight' },
      { name: 'GitHub Light', value: 'githubLight' },
      { name: 'Gruvbox Light', value: 'gruvboxLight' },
      { name: 'High Contrast Light', value: 'highContrastLight' },
      { name: 'Material Light', value: 'materialLight' },
      { name: 'Solarized Light', value: 'solarizedLight' },
      { name: 'Tokyo Night Day', value: 'tokyoNightDay' },
      { name: 'VS Code Light', value: 'vsCodeLight' },
  ];
  selectedTheme = 'catppuccinMocha';

  // Font family options
  fontFamilies = [
      'JetBrains Mono',
      'Fira Code',
      'IBM Plex Mono',
      'Source Code Pro',
      'Google Sans Code'  ];
  selectedFontFamily = 'JetBrains Mono';

  // Font size options
  fontSizes = [ '12px', '14px', '15px', '16px', '18px', '20px', '22px' ];
  selectedFontSize = '14px';

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
              this.themeCompartment.of(this.getThemeExtension()),
              this.styleCompartment.of(EditorView.theme({
                  '&': { height: '400px' },
                  '.cm-scroller': { overflow: 'auto' },
                  '.cm-content': { fontFamily: this.selectedFontFamily, fontSize: this.selectedFontSize },
              })),
              EditorState.readOnly.of(false),
          ],
      });

      this.editorView = new EditorView({
          state,
          parent: this.editorContainer.nativeElement,
      });
  }

  private getThemeExtension() {
      switch (this.selectedTheme) {
          case 'oneDark': return oneDark;
          case 'abcdef': return abcdef;
          case 'abyss': return abyss;
          case 'androidStudio': return androidStudio;
          case 'andromeda': return andromeda;
          case 'basicDark': return basicDark;
          case 'basicLight': return basicLight;
          case 'catppuccinMocha': return catppuccinMocha;
          case 'cobalt2': return cobalt2;
          case 'forest': return forest;
          case 'githubDark': return githubDark;
          case 'githubLight': return githubLight;
          case 'gruvboxDark': return gruvboxDark;
          case 'gruvboxLight': return gruvboxLight;
          case 'highContrastDark': return highContrastDark;
          case 'highContrastLight': return highContrastLight;
          case 'materialDark': return materialDark;
          case 'materialLight': return materialLight;
          case 'monokai': return monokai;
          case 'nord': return nord;
          case 'palenight': return palenight;
          case 'solarizedDark': return solarizedDark;
          case 'solarizedLight': return solarizedLight;
          case 'synthwave84': return synthwave84;
          case 'tokyoNightDay': return tokyoNightDay;
          case 'tokyoNightStorm': return tokyoNightStorm;
          case 'volcano': return volcano;
          case 'vsCodeDark': return vsCodeDark;
          case 'vsCodeLight': return vsCodeLight;
          default: return oneDark;
      }
  }

  onThemeChange(): void {
      if (this.editorView) {
          this.editorView.dispatch({
              effects: this.themeCompartment.reconfigure(this.getThemeExtension()),
          });
      }
  }

  onFontFamilyChange(): void {
      if (this.editorView) {
          this.editorView.dispatch({
              effects: this.styleCompartment.reconfigure(EditorView.theme({
                  '&': { height: '400px' },
                  '.cm-scroller': { overflow: 'auto' },
                  '.cm-content': { fontFamily: this.selectedFontFamily, fontSize: this.selectedFontSize },
              })),
          });
      }
  }

  onFontSizeChange(): void {
      if (this.editorView) {
          this.editorView.dispatch({
              effects: this.styleCompartment.reconfigure(EditorView.theme({
                  '&': { height: '400px' },
                  '.cm-scroller': { overflow: 'auto' },
                  '.cm-content': { fontFamily: this.selectedFontFamily, fontSize: this.selectedFontSize },
              })),
          });
      }
  }
}
