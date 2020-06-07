import React from 'react';
import { Route } from 'react-router-dom';
import LinkList from './Components/LinkList';
import EditLink from './Components/EditLink';
import DaysChart from './Components/DaysChart';
import TimeOfDayChart from './Components/TimeOfDayChart';
import AllDaysChart from './Components/AllDaysChart';
import AllTimeOfDayChart from './Components/AllTimeOfDayChart';
import BrowserChart from './Components/BrowserChart';
import SystemChart from './Components/SystemChart';

export default (
    <React.Fragment>​
        <Route exact path="/" component={LinkList} myname={"Lista linkow"}/>
        <Route path="/link/edit/:idLink" component={EditLink} name = "Edytuj link" />
        <Route path="/link/days/:idLink" component={DaysChart} name = "Wykres dni dla linku" />
        <Route path="/link/times/:idLink" component={TimeOfDayChart} name = "Wykres pór dnia dla linku" />
        <Route path="/link/all/days/:idLink" component={AllDaysChart} name = "Wykres dni dla wszystkich linków" />
        <Route path="/link/all/times/:idLink" component={AllTimeOfDayChart} name = "Wykres pór dnia dla wszystkich linków" />
      <Route path="/link/all/days" component={AllDaysChart} name = "Wykres dni dla wszystkich linków" />
      <Route path="/link/all/times" component={AllTimeOfDayChart} name = "Wykres pór dnia dla wszystkich linków" />
        <Route path="/link/browser/:idLink" component={BrowserChart} name = "Wykres przeglądarek" />
        <Route path="/link/system/:idLink" component={SystemChart} name = "Wykres systemów" />
    </React.Fragment>
);