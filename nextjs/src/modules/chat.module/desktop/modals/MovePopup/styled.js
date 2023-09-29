import styled from "styled-components";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";

export const MoveWrapper = styled.div`
  width: 517px;
  height: 414px;
  background-color: white;
  padding: 10px 10px 15px;
  font-family: SF Pro Text;

  .scrollbar {
    overflow: auto;
    height: 228px;
  }
  .scrollbar::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  .scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(196, 196, 196, 0.1);
  }
  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(196, 196, 196, 0.2);
  }
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(196, 196, 196, 0.4);
  }
  .scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(196, 196, 196, 0.6);
  }
  
  .search-option {
    display: flex;
    margin-bottom: 10px;
    column-gap: 8px;
    align-items: center;
    
    .label {      
      font-size: 12px;
      font-weight: 600;
      line-height: 10px;
    }
    .icon {
      cursor: pointer;
    }    
    .row {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  }
  
  .radio-row {
    display: flex;
    column-gap: 24px;
    margin-top: 13px;
    label {
      font-size: 12px;
      font-weight: 600;
      line-height: 10px;
    }
  }
  .radio-row:nth-child(3) {
    margin-top: 23px;
  }
  
  .dest {
    display: flex;
    margin-top: 20px;
    
    .category {
      flex: 1 0 0;
      .one {
        font-size: 12px;
        font-weight: 500;
        line-height: 22px;
        padding-left: 24px;
        cursor: pointer;
        max-height: 20px;
        overflow: hidden;
        
      }
      .one:hover {
        background-color: #0065FB20
      }
    }
    
    .detail {
      flex: 1 0 0;
      overflow-x: hidden;
      .label {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 170px;
        overflow: hidden;
        padding: 5px 0;
      }
    }
  }
  .btn-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 30px;
    column-gap: 37px;
    .btn {
      border: 0; outline: 0;
      background-color: transparent;
      cursor: pointer;
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: #000;
    }
    .btn.blue {
      color: #173FD4;
    }
  }
  .label {
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
    margin-right: 10px;
  }
  .label.bold {
    font-weight: 600;
  }
`
export const StyledTreeItem = styled(TreeItem)(({ theme, props }) => ({
  [`& .${treeItemClasses.label}`]: {
    fontFamily: 'SF Pro Text !important',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '12px !important',
    lineHeight: '14px !important',
    padding: '0px 5px 0 0!important',
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: 0,
    marginLeft: props.marginLeft
  },
  [`& .${treeItemClasses.selected}`]: {
    backgroundColor: 'transparent',
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: '0px',
  },
  [`& .${treeItemClasses.focused}`]: {
    backgroundColor: '#0065FB20!important',
  },
  [`& .${treeItemClasses.content}`]: {
    width: 'unset',
    padding: '0px'
  },
}))
