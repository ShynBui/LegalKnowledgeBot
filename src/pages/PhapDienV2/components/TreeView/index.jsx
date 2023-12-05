import TreeNode from '../TreeNode';

const TreeView = ({ data }) => {
    if (!data) return <></>;

    return (
        <>
            <div className="div"  style={{ height: '1000px', overflow: 'scroll' }}>
                {data.map((node, index) => {
                    return <TreeNode key={index} data={node} level={0}></TreeNode>;
                })}
            </div>
        </>
    );
};

export default TreeView;
