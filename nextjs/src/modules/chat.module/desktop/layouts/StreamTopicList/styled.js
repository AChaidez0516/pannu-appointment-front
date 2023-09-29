import styled from "styled-components";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";

export const StremTopicWrapper = styled.div`
    overflow: hidden;
`
export const StyledTreeItem = styled(TreeItem)(({ theme, props }) => ({
    [`& .${treeItemClasses.label}`]: {
        padding: '0 4.5% 0 0px!important',
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        marginRight: 0,
        marginLeft: `${props?.marginLeft}%`
    },
    [`& .${treeItemClasses.selected}`]: {
        backgroundColor: '#ECC7CA !important',
    },
    [`& .${treeItemClasses.focused}`]: {
        backgroundColor: '#ECC7CA !important',
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: '0px',
    },
    [`& .${treeItemClasses.content}`]: {
        width: 'unset',
        padding: '0px'
    },
}))

export const OtherUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //margin-top: 10px;
  margin-bottom: 10px;
  
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 10px;
    margin: 10px 0;
  }
  .text {
    padding: 0 4.5% 0 4%;
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    color: #000000;
    &:hover {
      background-color: #ECC7CA;  
    }
    &.clickable {
      cursor: pointer;
    }
  }
`
export const Divider = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #c4c4c4;
  flex: 1;
  margin: 0 10px 0px;
  justify-content: center;
`
export const DividerPlusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 10px 0 7%;
  
  .icon {
    cursor: pointer;
  }
`