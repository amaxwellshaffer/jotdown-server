const {User, Checklist, Notepad, CaptainsLog} = require(".");

Checklist.belongsTo(User);
User.hasMany(Checklist, {as: 'checklist'});

Notepad.belongsTo(User);
User.hasMany(Notepad, {as: 'notepad'});

CaptainsLog.belongsTo(User);
User.hasMany(CaptainsLog, {as: 'logEntries'});

