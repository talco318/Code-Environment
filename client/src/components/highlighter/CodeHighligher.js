// CodeHighlighter.js
import React, {useEffect, useRef, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';

const CodeHighlighter = ({language = 'javascript', initialCode, value, onChange, disabled}) => {
    const codeRef = useRef(null);
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [code]);

    const handleCodeChange = (e) => {
        const newText = e.target.value;
        setCode(newText);
        onChange(newText);
    };

    const highlightedCode = hljs.highlight(language, value).value;

    return (
        <div>
            <textarea readOnly={disabled} value={value} onChange={handleCodeChange} rows={10} style={{width: '100%'}}/>
            <pre>
        <code ref={codeRef} dangerouslySetInnerHTML={{__html: highlightedCode}}/>
      </pre>
        </div>
    );
};

export default CodeHighlighter;
