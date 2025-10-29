import Editor from "react-simple-wysiwyg";

function TextEditor({ html, setHtml }) {
  function onChange(e) {
    setHtml(e.target.value);
  }

  return <Editor style={{ width: "100%" }} value={html} onChange={onChange} />;
}
export default TextEditor;
