import { editor } from "monaco-editor"

/**
 * @description 替换选中文本
 * @param e HTMLelement
 * @param leftStr String
 * @param rightStr String
 * @deprecated
 */
export default function replaceSelection(e: any, leftStr: any, rightStr: any) {
  var start = e.selectionStart
  var end = e.selectionEnd
  // console.log(start, end)
  if (start == end) {
    return ""
  } else {
    let temp =
      e.value.substr(0, start) +
      leftStr +
      e.value.substring(start, end) +
      rightStr +
      e.value.substring(end, e.value.length)
    e.value = temp
    // console.log(e.value.substring(start, end))
    // console.log(e.value.substring(start, end).length)
    // 移动光标
    e.setSelectionRange(start, end + leftStr.length + rightStr.length)
  }
}

/**
 * @description 替换选择的内容
 */
export function replaceMonacoSelection(newText: string = "nihao") {
  const _editor = window.editor // 假设你只有一个编辑器实例
  const currentSelection = _editor.getSelection()
  _editor.executeEdits("my-replace", [
    {
      range: new window.monaco.Range(
        currentSelection.startLineNumber,
        currentSelection.startColumn,
        currentSelection.endLineNumber,
        currentSelection.endColumn
      ),
      text: newText,
      forceMoveMarkers: true,
    },
  ])
}

/**
 * @description 范围替换文本
*/
export function replaceMonacoInRange(
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number,
  newText: string
) {
  const _editor = window.editor // 假设你只有一个编辑器实例
  // const currentSelection = _editor.getSelection()
  _editor.executeEdits("my-replace", [
    {
      range: new window.monaco.Range(
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn
      ),
      text: newText,
      forceMoveMarkers: true,
    },
  ])
}

export function replaceMonacoAll(
  model: editor.ITextModel,
  editor: editor.IStandaloneCodeEditor,
  newText: string = ""
) {
  const _editor = editor ?? window.editor // 假设你只有一个编辑器实例
  let allRange = model.getFullModelRange()
  _editor.executeEdits("my-replace2", [
    {
      range: allRange,
      text: newText,
      forceMoveMarkers: true,
    },
  ])
}
