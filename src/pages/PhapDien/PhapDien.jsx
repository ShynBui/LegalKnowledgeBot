import { forwardRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSpring, animated } from '@react-spring/web';
import SvgIcon from '@mui/material/SvgIcon';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom';
import { get } from '~/utils/request';

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const CustomTreeItem = forwardRef((props, ref) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

const CustomizedTreeView = () => {
    const renderTree = (nodes) => (
        <StyledTreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <>
                    <span>{nodes.name}</span>
                    {nodes.type !== 'Chủ đề' && (
                        <Link to={`/phap-dien/${nodes.link}`} style={{ marginLeft: 10, color: 'green' }}>
                            (Xem chi tiết)
                        </Link>
                    )}
                </>
            }
            // onClick={nodes.onClick}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    );

    const [defaultExpand, setDefaultExpand] = useState(['0']);
    const [data, setData] = useState({
        id: '0',
        name: 'Bộ pháp điển',
        children: [],
        type: 'Chủ đề',
    });

    useEffect(() => {
        (async () => {
            let chu_de = await get('/chu_de_phap_dien');
            let de_muc = await get('/de_muc_phap_dien');
            let chuong = await get('/chuong_va_dieu_phap_dien');

            let cmpFn = (a, b) => (a.stt < b.stt ? -1 : a.stt > b.stt ? 1 : 0);
            chu_de.sort(cmpFn);
            de_muc.sort(cmpFn);
            chuong.sort((a, b) => (a.mapc < b.mapc ? -1 : a.mapc > b.mapc ? 1 : 0));

            setData({
                ...data,
                children: chu_de.map((cd) => ({
                    id: cd.id,
                    name: cd.ten_chu_de,
                    children: (() =>
                        de_muc
                            .filter((d) => d.chu_de_id == cd.id)
                            .map((d) => ({
                                id: d.id,
                                name: d.ten_chu_de,
                                link: d.id,
                                children: (() => {
                                    let tmp = chuong.filter((c) => c.de_muc_id === d.id);
                                    let ch = tmp
                                        .filter((c) => c.ten.startsWith('Chương'))
                                        .map((c) => ({
                                            id: c.id,
                                            name: c.ten,
                                            link: d.id,
                                            children: [],
                                            // children: tmp
                                            //     .filter((c) => !c.ten.startsWith('Chương'))
                                            //     .map((c) => ({
                                            //         id: c.id,
                                            //         name: c.ten,
                                            //         children: [],
                                            //         type: 'Điều',
                                            //     })),
                                            type: 'Chương',
                                        }));
                                    return ch;
                                })(),
                                type: 'Đề mục',
                            })))(),
                    type: 'Chủ đề',
                })),
            });
        })();
    }, []);

    return (
        <Box sx={{ maxHeight: 270, flexGrow: 1, maxWidth: '100%' }}>
            <TreeView
                aria-label="customized"
                defaultExpanded={defaultExpand}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
                sx={{ overflowX: 'hidden' }}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
    );
};

const PhapDien = () => {
    return <CustomizedTreeView />;
};

export default PhapDien;
