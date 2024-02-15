import React from 'react';
import { Tabs } from 'antd';
import FilmsList from '../FilmsList/filmslist';
import './tabs.css'
const items = [
    {
      key: '1',
      label: 'Search',
      children: <FilmsList/>
    },
    {
      key: '2',
      label: 'Rated',
      children: '```'
    },
  ];
const TabsPanel = () => {
    return (
        <Tabs defaultActiveKey="1" items={items} width = {1100} className='tabs-options' size = {'middle'}/>
    )
}
export default TabsPanel
