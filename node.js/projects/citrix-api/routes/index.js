var express = require('express');
var router = express.Router();
var db = require('../utils/db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  let result = db.Query();
  result.then((resul) => {
    var jsonStr = JSON.stringify(resul.recordset);
    res.json(JSON.parse(jsonStr));
  }).catch((e) => {
    console.log(e)
  })
  // res.render('index', { title: 'Express' });
});

router.get('/reboots/location/:loc/:name', (req,res,next) => {
  db.rebootSchedules(req.params.loc)
    .then((r) => {
      const deliveryGroups = r.recordset;
      const filteredDeliveryGroups = deliveryGroups.filter(deliveryGroup => deliveryGroup.Location.toLowerCase() === req.params.loc.toLowerCase())
      
      if (req.params.name) {
        const specificDeliveryGroup = filteredDeliveryGroups.filter(dgs => dgs.DesktopGroupName.toLowerCase() === req.params.name.toLowerCase() )
        const filteredDeliveryGroupsString = JSON.stringify(specificDeliveryGroup);
        const filteredDeliveryGroupsJSON = JSON.parse(filteredDeliveryGroupsString);
        res.json(filteredDeliveryGroupsJSON);
      }


  }).catch((e) => {
    res.send(e).status(400);
  })
});

router.get('/reboots/location/:loc', (req, res) => {
  db.rebootSchedules(req.params.loc)
    .then((r) => {
      const deliveryGroups = r.recordset;
      const filteredDeliveryGroups = deliveryGroups.filter(deliveryGroup => deliveryGroup.Location.toLowerCase() === req.params.loc.toLowerCase())
      const filteredDeliveryGroupsString = JSON.stringify(filteredDeliveryGroups);
      const filteredDeliveryGroupsJSON = JSON.parse(filteredDeliveryGroupsString);
      res.json(filteredDeliveryGroupsJSON);
  }).catch((e) => {
    res.send(e).status(400);
  })
});

router.get('/servers', (req, res) => {
  db.servers().then((s) => {
    let servers = s.recordset;
    const serversString = JSON.stringify(servers);
    const serversJson = JSON.parse(serversString);
    let newArr = serversJson.map((jf) => {
      jf.PublishedApplications = JSON.parse(jf.PublishedApplications)
      return jf;
    });
    res.json(newArr);
  }).catch((e) => {
    res.send(e).status(400)
  })  
}); 

router.get('/applications/:uid', (req, res) => {
  db.applications().then((a) => {
    let apps = a.recordset;
    let filteredApps = apps.filter((app) => app.Uid === parseInt(req.params.uid));
    let filteredAppsString = JSON.stringify(filteredApps);
    let filteredAppsJson = JSON.parse(filteredAppsString);
    let newArr = filteredAppsJson.map((jf) => {
      jf.AssociatedDesktopGroupUids = JSON.parse(jf.AssociatedDesktopGroupUids)
      jf.AssociatedUserFullNames = JSON.parse(jf.AssociatedUserFullNames)
      jf.AssociatedUserNames = JSON.parse(jf.AssociatedUserNames)
      jf.AssociatedUserUPNs = JSON.parse(jf.AssociatedUserUPNs)
      jf.CommandLineArguments = JSON.parse(jf.CommandLineArguments)
      return jf;
    });
    res.json(newArr);
  }).catch((e) => {
    res.send(e).status(400);
  })
});


router.get('/applications', (req, res) => {
  db.applications().then((a) => {
    let apps = a.recordset;
    let appsString = JSON.stringify(apps);
    let appsJson = JSON.parse(appsString);
    let newArr = appsJson.map((jf) => {
      jf.AssociatedDesktopGroupUids = JSON.parse(jf.AssociatedDesktopGroupUids)
      jf.AssociatedUserFullNames = JSON.parse(jf.AssociatedUserFullNames)
      jf.AssociatedUserNames = JSON.parse(jf.AssociatedUserNames)
      jf.AssociatedUserUPNs = JSON.parse(jf.AssociatedUserUPNs)
      jf.CommandLineArguments = JSON.parse(jf.CommandLineArguments)
      return jf;
    });
    res.json(newArr);
  }).catch((e) => {
    res.send(e).status(400);
  })
});

router.get('/deliveryGroups', (req, res) => {
  db.deliveryGroups()
    .then((d) => {
      let dgs = d.recordset;
      let dgString = JSON.stringify(dgs);
      let dgJson = JSON.parse(dgString);
      let newArr = dgJson.map((dg) => {
        dg.Tags = JSON.parse(dg.Tags);
        return dg;
      });
      res.json(newArr);
    }).catch((e) => {
      res.send(e).status(400);
    })
});


module.exports = router;
