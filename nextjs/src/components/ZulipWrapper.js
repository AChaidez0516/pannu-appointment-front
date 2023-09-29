import {
    MacOSIcon,
    IosIcon,
    WindowsIcon,
    AndroidIcon
  } from "../common/utils/Icons";
const ZulipWrapper = () => {
    return (
        <div style={{ padding: '0 12px'}}>
            <a href="https://zulip.com/apps/ios" target="_blank" style={{ marginRight: 15}}>
                <IosIcon height="32px" width="32px" color="#173fd4"/>
            </a>
            <a href="https://zulip.com/apps/android" target="_blank" style={{ marginRight: 15}}>
                <AndroidIcon height="32px" width="32px" color="#173fd4"/>
            </a>
            <a href="https://zulip.com/apps/windows" target="_blank" style={{ marginRight: 15}}>
                <WindowsIcon height="32px" width="32px" color="#173fd4"/> 
            </a>
            <a href="https://zulip.com/apps/mac" target="_blank">
                <MacOSIcon height="32px" width="32px" color="#173fd4"/>
            </a>
        </div>
    );
};

export default ZulipWrapper;