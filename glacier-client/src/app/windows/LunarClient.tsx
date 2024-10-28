import { Dropdown, Input, Option, OptionOnSelectData, SelectionEvents, Button } from "@fluentui/react-components";
import Window from "../components/Window";
import { useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SearchRegular, RecordStopRegular, ArrowRotateClockwiseRegular, ArrowRotateCounterclockwiseRegular, ArrowRedoRegular } from "@fluentui/react-icons";
import { registerSWandset } from "../utils/doSWStuff";
import "./lunar.css";
import contsants from "../Constants";
import { nameToID, toggleStoreApp } from "./store/StoreApps";

interface SelectedClientData {
    name: string;
    version: string;
    icon: string;
    windowID: string;
    windowURL: string;
    windowName: string;
}

const clients = {
    "boost": {
        name: "Boost",
        version: "1.8.9+",
        icon: "/image/b.png",
        windowID: "boost",
        windowURL: "https://pages.gavingogaming.com/mediaology-game-repo/eagle/boost",
        windowName: "Minecraft (boost)"
    },
    "glacier": {
        name: "Glacier",
        version: "1.8.9",
        icon: "/windows/glacierwhite.png",
        windowID: "glacier",
        windowURL: "https://pages.gavingogaming.com/mediaology-game-repo/eagle/glacier",
        windowName: "Minecraft (glacier)"
    },
}

export default function LunarClientApp() {
    const [selectedClient, setSelectedClient] = useState<SelectedClientData>(clients.glacier);
    const [activeTab, setActiveTab] = useState("home");

    function launchGame() {
        let launcher = document.querySelector('.lunar') as HTMLElement;
        launcher.classList.add('closing');
        launcher.classList.remove('opening');
        
        if(document.getElementById('lunar-tb-app')) {
          (document.getElementById('lunar-tb-app') as HTMLDivElement).classList.remove('active');
        }

        toggleStoreApp(nameToID(selectedClient.windowName), {
            name: selectedClient.windowName,
            unblock: true,
            url: selectedClient.windowURL,
            category: "Minecraft"
        });
    }

    function handleTabChange(tabName: string) {
        setActiveTab(tabName);
    }

    return (
        <Window noDragging={true} title="Lunar Client" id="lunar" taskbarIconID="lunar" color={'gray'} seperateBorder="1px solid #ffffff0a">
            <div className="window-full lunar-window">
                <div className="lunar-nav">
                    <div className="lunar-part" onClick={() => handleTabChange("home")}>
                        <img height={45} width={50} src={contsants.LUNAR.ICON} alt="Home" />
                    </div>
                    <div className={`lunar-part ${activeTab === "gamepad" ? "active" : ""}`} onClick={() => handleTabChange("gamepad")}>
                        <img width={30} src={contsants.LUNAR.GAMEPAD} alt="Gamepad" />
                    </div>
                    <div className={`lunar-part ${activeTab === "puzzle" ? "active" : ""}`} onClick={() => handleTabChange("puzzle")}>
                        <img width={30} src={contsants.LUNAR.PUZZLE} alt="Puzzle" />
                    </div>
                    <div className={`lunar-part ${activeTab === "earth" ? "active" : ""}`} onClick={() => handleTabChange("earth")}>
                        <img width={30} src={contsants.LUNAR.EARTH} alt="Earth" />
                    </div>
                    <div className={`lunar-part ${activeTab === "news" ? "active" : ""}`} onClick={() => handleTabChange("news")}>
                        <img width={30} src={contsants.LUNAR.NEWS} alt="News" />
                    </div>
                    <div className={`lunar-part ${activeTab === "cart" ? "active" : ""}`} onClick={() => handleTabChange("cart")}>
                        <img width={30} src={contsants.LUNAR.CART} alt="Cart" />
                    </div>
                    <div className={`lunar-part ${activeTab === "settings" ? "active" : ""}`} onClick={() => handleTabChange("settings")}>
                        <img width={30} src={contsants.LUNAR.SETTINGS} alt="Settings" />
                    </div>
                </div>
                <div className="lunar-content">
                    {activeTab === "home" && (
                        <div>Home Content</div>
                    )}
                    {activeTab === "gamepad" && (
                        <div>Gamepad Content</div>
                    )}
                    {activeTab === "puzzle" && (
                        <div>Puzzle Content</div>
                    )}
                    {activeTab === "earth" && (
                        <div>Earth Content</div>
                    )}
                    {activeTab === "news" && (
                        <div>News Content</div>
                    )}
                    {activeTab === "cart" && (
                        <div>Cart Content</div>
                    )}
                    {activeTab === "settings" && (
                        <div>Settings Content</div>
                    )}
                </div>
            </div>
        </Window>
    );
}
