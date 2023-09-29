import styled, { css } from "styled-components"

export const Tab = ({ tabList, selectTab, setSelectTab }) => {
  return (
    <TabWrapper>
      {tabList && tabList.length && tabList.map((tabName, i) => (
        <TabItem
          key={i}
          activeTab={tabName === selectTab}
          onClick={() => setSelectTab(tabName)}
        >{tabName}</TabItem>
      ))}
    </TabWrapper>
  )
}

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #173FD4;
  border-radius: 3px;
`
export const TabItem = styled.div`
  flex: 1;
  min-width: 70px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #173FD4;
  ${({ activeTab }) => activeTab && css`
    background-color: #173FD4;
    color: white;
  `}
  cursor: pointer;
`
