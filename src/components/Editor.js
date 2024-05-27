import { CodeiumEditor } from "@codeium/react-code-editor";
const ProgrammingEditor = ({setCode, code, language}) => {
  return (
    <div>
      <CodeiumEditor className="p-2" onChange={(val) => {
        setCode(val)
      }} value={code} options={{fontSize: "20px", padding: "5px"}} language={language} height={"80vh"} width={"100%"} theme="vs-dark" />
    </div>
  );
};

export {ProgrammingEditor}