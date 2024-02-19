import React,{useState} from 'react';
import { Tabs } from 'antd';
import FilmsList from '../FilmsList/filmslist';
import './tabs.css'
const TabsPanel = ({guestSession}) => {
  const [currentTab,setCurrentTab] = useState('1');
  
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <FilmsList currentTab = {currentTab} guestSession = {guestSession}/>
    },
    {
      key: '2',
      label: 'Rated',
      children: <FilmsList currentTab = {currentTab} guestSession = {guestSession}/>,
    },
  ];
    return (
        <Tabs onTabClick={(key) => {setCurrentTab(key)}} defaultActiveKey="1" items={items} className='tabs-options' size = {'middle'}/>
    )
}
export default TabsPanel
