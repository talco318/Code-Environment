import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Spinner} from 'react-bootstrap';

const CodeBlockComponent = ({onSelectCode}) => {
    const [codeBlockData, setCodeBlockData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSelectCodeHandler = (id) => {
        onSelectCode(id);
    };

    const renderBlockItemName = (name)=> `Block ->  ${name}`
    const renderOptions = () => (
        <>
        <label>Select code block:</label>
        <Form.Select aria-label="Default select example"
                     onChange={(selected) => onSelectCodeHandler(selected.target.value)}>
            {codeBlockData.map((block, i) => (
                <option key={i} value={block}>
                    {renderBlockItemName(block)}
                </option>
            ))}
        </Form.Select>
        </>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://codeserver-k7ch.onrender.com/get-code-blocks');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCodeBlockData(data);

                // Set default value if there is at least one code block
                if (data.length > 0) {
                    onSelectCode(data[0]);
                }

                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [onSelectCode]);

    return (
        <div>
            {isLoading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {error && <p>Error: {error}</p>}

            {codeBlockData && <pre>{renderOptions()}</pre>}
        </div>
    );
};

export default CodeBlockComponent;
