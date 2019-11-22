import React from 'react';
import WelcomeStepIcon from '@material-ui/icons/Home';
import TextStepIcon from '@material-ui/icons/Chat';
import ImageStepIcon from '@material-ui/icons/Photo';
import VideoStepIcon from '@material-ui/icons/Videocam';
import QuickActionStepIcon from '@material-ui/icons/FormatListBulleted';
import QuickReplyStepIcon from '@material-ui/icons/Storage';
import InputStepIcon from '@material-ui/icons/QuestionAnswer';
import CalendarStepIcon from '@material-ui/icons/Today';
import BranchStepIcon from '@material-ui/icons/CallSplit';
import AuthenticationStepIcon from '@material-ui/icons/LockOpen';
import FeedbackStepIcon from '@material-ui/icons/Grade';
import APIStepIcon from '@material-ui/icons/SettingsInputComponent';
import TriggerTaskStepIcon from '@material-ui/icons/Link';
import EmbedTaskStepIcon from '@material-ui/icons/WrapText';
import EndTaskStepIcon from '@material-ui/icons/NotInterested';
import WebhookStepIcon from '@material-ui/icons/SettingsEthernet';
import NotificationStepIcon from '@material-ui/icons/NotificationsNone';
import TalkToHumanStepIcon from '@material-ui/icons/SupervisorAccount';

const MenuConfig = {
  domain: [
    {
      name: 'Tasks',
      route: '/domains/:domainId/tasks'
    }
  ],
  agent: []
};

const AlertConfigType={
INFO:'primary',
ERROR:'danger',
SUCCESS:'success',
WARNING:'warning'
}

const contactTopTabs={
  ALL:'All',
  RECENT:'Recent',
  NAME:'name',
  CREATEDAT:'createdat'
}

const AccountType={
  MULITLOCATIONMASTER:"MULTIPLE_SUBSCRIPTION_MASTER_ACCOUNT",
  MULTILOCATIONCHILD:"MULTIPLE_SUBSCRIPTION_CHILD_ACCOUNT",
  SINLGELOCATION:"SINGLE_SUBSCRIPTION"
}

const brandingInfoCss = {
  botBgColor:'efefef',
  botFontColor:'3a3a3a',
  userFontColor:'fff',
  userBgColor:'149bf3'
}

const ChatBotProperties = {
  brandingInfo:'chatStyleProperties'
}

const IdleTimeConfig = {
  checkThreshold: 5,
  autoLogoutThreshold: 23, // 23 hours in minutes.
  contactcenterRefresh:600000
};

const TimelineType={
  NOTE:'NOTES',
  EMAIL:'EMAIL_NOTIFICATION',
  SMS:'SMS_NOTIFICATION',
  SYSTEM:'SYSTEM_UPDATE',
  OUTGOING_SMS:'OUTGOING_SMS',
  INCOMING_SMS:'INCOMING_SMS',
  INCOMING_PHONE:'INCOMING_PHONE'
}

const TimelineIcon={
  NOTES:'fas fa-sticky-note',
  EMAIL_NOTIFICATION:'fas fa-envelope',  
  SMS_NOTIFICATION:'fas fa-comment-alt',
  SYSTEM_UPDATE:'fas fa-flag',
  INCOMING_SMS:'fas fa-paper-plane',
  OUTGOING_SMS:'fas fa-paper-plane',
  INCOMING_PHONE:'fas fa-phone'
}

const TimelineTitle={
  NOTES:'NOTE',
  EMAIL_NOTIFICATION:'EMAIL',  
  SMS_NOTIFICATION:'SMS',
  SYSTEM_UPDATE:'SYSTEM UPDATE',
  INCOMING_SMS:'INCOMING SMS',
  OUTGOING_SMS:'OUTGOING SMS',
  INCOMING_PHONE:'INCOMING PHONE'
}


const SocketConfig = {
  subscribeTopicPrefix: '/topic'
};

const LangConfig = {
  default: 'en',
  defaultValue: 'EN_US',
  list: [
    {
      name: 'English',
      label: 'English',
      iso: 'en'
    }
  ]
};

const WizardMenus=[
  'Subscribe',
  'Manage Locations',
  // 'Manage Users',
  'Customize',
  // 'Knowledge Base',
  'Test',
  'Deploy'
];

const wizardMenuForSingleLocation =[
  'Subscribe',
  // 'Manage Users',
  'Customize',
  'Knowledge Base',
  'Test',
  'Deploy'
];

const defaultBotProperties =  {
  name: "Digital Receptionist - Orthopedics ",
  "description": "Receptionist can provide information about the practice, clarify insurance questions, educate visitors about services provided, book appointments and much more.\n\n",
  "wizardStatus": {
    "Subscribe": true,
    "nextStage": "stepCustomization",
    "stepCustomization": {
      "stepNumber": "0"
    }
  }
}

const defaultMultiLocationField = [{
  label:`Welcome`, 
  description:`Let us know following details.`,
  fieldDetails:[
    {name:`@partition.welcome_config`,description:"The receptionist will greet your patients with this welcome message.",label:"Welcome Message"},
    {name:`@partition.welcome_title`,description:"The receptionist will use this message to ask the user to select their preferred location.",label:"Instruction to choose location"},
    {name:`@business.Website`,description:"Enter the business website url.",label:"Business website"}]
  }]

const MultiContextBotType = {
  LOCATION:"LOCATION"
}

const WizardPath={
  BUSINESS_CATEGORY:{
    index:2,
    path:"/bot/BusinessCategory"
  },
  // MANAGE_USERS:{
  //   index:3,
  //   path:"/bot/ManageUsers"
  // },
  CUSTOMIZE:{
    index:3,
    path:"/bot/customization"
  },
  KRR:{
    index:4,
    path:"/bot/knowledgebase"
  },
  TEST:{
    index:5,
    path:"/bot/test"
  },
  DEPLOY:{
    index:6,
    path:"/bot/deployment"
  }
}

const WizardMenuPath=[
  "/botstore","/customization","/test","/deployment","/mybots"
];

const StepMenus = [
  'WELCOME',
  'TEXT',
  'QUICK_ACTION',
  'QUICK_REPLY',
  'IMAGE',
  'VIDEO',
  'INPUT',
  'NOTIFICATION',
  'TALK_TO_HUMAN',
  'CALENDAR',
  'WEBHOOK',
  'BRANCH',
  'AUTHENTICATION',
  'TRIGGER_TASK',
  'EMBED_TASK',
  'FEEDBACK',
  'END_TASK'
];

const stepConfigKey = 'stepConfig';

const StepTypes = {
  WELCOME: {
    label: 'Welcome',
    icon: <WelcomeStepIcon className="stepIcon" />,
    key: 'WELCOME',
    configKey: `${stepConfigKey}.welcomeConfig`
  },
  TEXT: {
    label: 'Text',
    icon: <TextStepIcon className="stepIcon" />,
    key: 'TEXT',
    configKey: `${stepConfigKey}.textConfig`
  },
  QUICK_ACTION: {
    label: 'Quick Action',
    icon: <QuickActionStepIcon className="stepIcon" />,
    key: 'QUICK_ACTION',
    configKey: `${stepConfigKey}.quickActionConfig`
  },
  QUICK_REPLY: {
    label: 'Quick Reply',
    icon: <QuickReplyStepIcon className="stepIcon" />,
    key: 'QUICK_REPLY',
    configKey: `${stepConfigKey}.quickReplyConfig`
  },
  IMAGE: {
    label: 'Image',
    icon: <ImageStepIcon className="stepIcon" />,
    key: 'IMAGE',
    configKey: `${stepConfigKey}.imageConfig`
  },
  VIDEO: {
    label: 'Video',
    icon: <VideoStepIcon className="stepIcon" />,
    key: 'VIDEO',
    configKey: `${stepConfigKey}.videoConfig`
  },
  INPUT: {
    label: 'Get Value',
    icon: <InputStepIcon className="stepIcon" />,
    key: 'INPUT',
    configKey: `${stepConfigKey}.inputConfig`
  },
  NOTIFICATION: {
    label: 'Notification',
    icon: <NotificationStepIcon className="stepIcon" />,
    key: 'NOTIFICATION',
    configKey: `${stepConfigKey}.notificationConfig`
  },
  TALK_TO_HUMAN: {
    label: 'Handover to Human',
    icon: <TalkToHumanStepIcon className="stepIcon" />,
    key: 'TALK_TO_HUMAN',
    configKey: `${stepConfigKey}.talkToHumanConfig`
  },
  CALENDAR: {
    label: 'Appointments',
    icon: <CalendarStepIcon className="stepIcon" />,
    key: 'CALENDAR',
    configKey: `${stepConfigKey}.calendarConfig`
  },
  WEBHOOK: {
    label: 'Webhook',
    icon: <WebhookStepIcon className="stepIcon" />,
    key: 'WEBHOOK',
    configKey: `${stepConfigKey}.webhookConfig`
  },
  BRANCH: {
    label: 'Condition',
    icon: <BranchStepIcon className="stepIcon" />,
    key: 'BRANCH',
    configKey: `${stepConfigKey}.branchConfig`
  },
  AUTHENTICATION: {
    label: 'Authentication',
    icon: <AuthenticationStepIcon className="stepIcon" />,
    key: 'AUTHENTICATION',
    configKey: `${stepConfigKey}.authenticationConfig`
  },
  TRIGGER_TASK: {
    label: 'Link Task',
    icon: <TriggerTaskStepIcon className="stepIcon" />,
    key: 'TRIGGER_TASK',
    configKey: `${stepConfigKey}.triggerTaskConfig`
  },
  EMBED_TASK: {
    label: 'Embed Task',
    icon: <EmbedTaskStepIcon className="stepIcon" />,
    key: 'EMBED_TASK',
    configKey: `${stepConfigKey}.embedTaskConfig`
  },
  FEEDBACK: {
    label: 'Feedback',
    icon: <FeedbackStepIcon className="stepIcon" />,
    key: 'FEEDBACK',
    configKey: `${stepConfigKey}.feedbackConfig`
  },
  END_TASK: {
    label: 'End Task',
    icon: <EndTaskStepIcon className="stepIcon" />,
    key: 'END_TASK',
    configKey: `${stepConfigKey}.endTaskConfig`
  },
  API: {
    label: 'API',
    icon: <APIStepIcon className="stepIcon" />,
    key: 'API',
    configKey: `${stepConfigKey}.apiConfig`
  },
  LINK_QUESTION: {
    label: 'Link Question',
    icon: <TriggerTaskStepIcon className="stepIcon" />,
    key: 'LINK_QUESTION',
    configKey: `${stepConfigKey}.triggerTaskConfig`
  }
};

const DefaultTableConfig = {
  rowsPerPage: 25
};


const DataTypes = [
  { name: 'Text', value: 'TEXT' },
  { name: 'Number', value: 'NUMBER' },
  { name: 'Decimal', value: 'DECIMAL' },
  { name: 'Boolean', value: 'BOOLEAN' },
  // { name: 'Long Text', value: 'LONGTEXT' },
  { name: 'Date Time', value: 'DATETIME' },
  { name: 'Date', value: 'DATE' },
  { name: 'Phone', value: 'PHONE' },
  { name: 'Email', value: 'EMAIL' }
];

const ExpressionOperators = {
  STRING: [
    { label: '=', value: 'EQUALS' },
    { label: '= (Ignore case)', value: 'EQUALS_IGNORE_CASE' },
    { label: 'IN', value: 'IN' },
    { label: 'IN (Ignore case)', value: 'IN_IGNORE_CASE' },
    { label: '!=', value: 'NOT_EQUALS' },
    { label: '!= (Ignore case)', value: 'NOT_EQUALS_IGNORE_CASE' },
    { label: 'NOT IN', value: 'NOT_IN' },
    { label: 'NOT IN (Ignore case)', value: 'NOT_IN_IGNORE_CASE' }
  ],
  TEXT: [
    { label: '=', value: 'EQUALS' },
    { label: '= (Ignore case)', value: 'EQUALS_IGNORE_CASE' },
    { label: 'IN', value: 'IN' },
    { label: 'IN (Ignore case)', value: 'IN_IGNORE_CASE' },
    { label: '!=', value: 'NOT_EQUALS' },
    { label: '!= (Ignore case)', value: 'NOT_EQUALS_IGNORE_CASE' },
    { label: 'NOT IN', value: 'NOT_IN' },
    { label: 'NOT IN (Ignore case)', value: 'NOT_IN_IGNORE_CASE' }
  ],
  NUMBER: [
    { label: '=', value: 'EQUALS' },
    { label: '>', value: 'GREATER_THAN' },
    { label: '>=', value: 'GREATER_THAN_OR_EQUAL_TO' },
    { label: 'IN', value: 'IN' },
    { label: '<', value: 'LESSER_THAN' },
    { label: '<=', value: 'LESSER_THAN_OR_EQUAL_TO' },
    { label: '!=', value: 'NOT_EQUALS' },
    { label: 'NOT IN', value: 'NOT_IN' }
  ],
  DATE: [
    { label: '=', value: 'EQUALS' },
    { label: '>', value: 'GREATER_THAN' },
    { label: '>=', value: 'GREATER_THAN_OR_EQUAL_TO' },
    { label: 'IN', value: 'IN' },
    { label: '<', value: 'LESSER_THAN' },
    { label: '<=', value: 'LESSER_THAN_OR_EQUAL_TO' },
    { label: '!=', value: 'NOT_EQUALS' },
    { label: 'NOT IN', value: 'NOT_IN' }
  ],
  DATETIME: [
    { label: '=', value: 'EQUALS' },
    { label: '<', value: 'GREATER_THAN' },
    { label: '<=', value: 'GREATER_THAN_OR_EQUAL_TO' },
    { label: 'IN', value: 'IN' },
    { label: '>', value: 'LESSER_THAN' },
    { label: '>=', value: 'LESSER_THAN_OR_EQUAL_TO' },
    { label: '!=', value: 'NOT_EQUALS' },
    { label: 'NOT IN', value: 'NOT_IN' }
  ],
  BOOLEAN: [{ label: 'IS', value: 'IS' }, { label: 'IS NOT', value: 'IS_NOT' }],
  PHONE: [{ label: '=', value: 'EQUALS' }, { label: '!=', value: 'NOT_EQUALS' }],
  EMAIL: [{ label: '=', value: 'EQUALS' }, { label: '!=', value: 'NOT_EQUALS' }]
};

const ExpressionOperatorsConfig = [
  {
    label: '=',
    value: 'EQUALS'
  },
  {
    label: '!=',
    value: 'NOT_EQUALS'
  },
  {
    label: '>',
    value: 'GREATER_THAN'
  },
  {
    label: '>=',
    value: 'GREATER_THAN_OR_EQUAL_TO'
  },
  {
    label: '<',
    value: 'LESSER_THAN'
  },
  {
    label: '<=',
    value: 'LESSER_THAN_OR_EQUAL_TO'
  },
  {
    label: 'IN',
    value: 'IN'
  },
  {
    label: 'NOT IN',
    value: 'NOT_IN'
  },
  {
    label: 'SIZE',
    value: 'SIZE'
  }
];

const getMainMenuList = locale => [{ name: locale.domains, path: '/domains' }];

const ApiBasePath = {
  AUTOMATION_API: '/partner/v1',
  BUSINESS_API: '/business/v1',
  CONSUMER_API: '/consumer/v1',
  KRR_API: '/krr/v1',
  IAM_API: '/iam/v1'
};

const CalendarCredential = {
  GOOGLE: {
    path: '/gauth/o/oauth2/token',
    scope: 'https://www.googleapis.com/auth/calendar',
    accessType: 'offline',
    responseType: 'code'
  }
};

const httpMethods = [{ label: 'GET' }, { label: 'POST' }];

const WeekDays = [
  { name: 'Mon', value: 1 },
  { name: 'Tue', value: 2 },
  { name: 'Wed', value: 3 },
  { name: 'Thu', value: 4 },
  { name: 'Fri', value: 5 },
  { name: 'Sat', value: 6 },
  { name: 'Sun', value: 7 }
];

const FileTypes = {
  default: 'OTHERS',
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOC',
  'application/txt':'TXT',
  'text/csv':'CSV'
};

const VideoFileTypes = 'video/mp4';

const VideoFileTypesDisplay="mp4";

const ImageFileTypes = 'image/jpg,image/jpeg,image/png';

const ImageFileTypesDisplay='JPG,JPEG,PNG';

const VideoSizeLimit = {
  size: 10485760,
  isEnabled: true
};

const ImageSizeLimit = {
  size: 2097152,
  isEnabled: true
};

const AuthenticationMethods = [
  { name: 'Login using Google', value: 'GOOGLE' },
  { name: 'Login using Facebook', value: 'FACEBOOK' },
  { name: 'Login using Salesforce', value: 'SALESFORCE' },
  { name: 'One time password (OTP)', value: 'OTP' }
];

const Timezones = [
  { label: `Africa/Abidjan`,value:`Africa/Abidjan`},
  { label: `Africa/Accra`,value:`Africa/Accra`},
  { label: ` Africa/Addis_Ababa`,value:`Africa/Addis_Ababa`},
  { label: ` Africa/Algiers`,value:`Africa/Algiers`},
  { label: ` Africa/Asmara`,value:`Africa/Asmara`},
  { label: ` Africa/Asmera`,value:`Africa/Asmera`},
  { label: `Africa/Bamako`,value:`Africa/Bamako`},
  { label: ` Africa/Bangui`,value:`Africa/Bangui`},
  { label: `Africa/Banjul`,value:`Africa/Banjul`},
  { label: `Africa/Bissau`,value:`Africa/Bissau`},
  { label: ` Africa/Blantyre`,value:`Africa/Blantyre`},
  { label: ` Africa/Brazzaville`,value:`Africa/Brazzaville`},
  { label: ` Africa/Bujumbura`,value:`Africa/Bujumbura`},
  { label: ` Africa/Cairo`,value:`Africa/Cairo`},
  { label: ` Africa/Casablanca`,value:`Africa/Casablanca`},
  { label: ` Africa/Ceuta`,value:`Africa/Ceuta`},
  { label: `Africa/Conakry`,value:`Africa/Conakry`},
  { label: `Africa/Dakar`,value:`Africa/Dakar`},
  { label: ` Africa/Dar_es_Salaam`,value:`Africa/Dar_es_Salaam`},
  { label: ` Africa/Djibouti`,value:`Africa/Djibouti`},
  { label: ` Africa/Douala`,value:`Africa/Douala`},
  { label: ` Africa/El_Aaiun`,value:`Africa/El_Aaiun`},
  { label: `Africa/Freetown`,value:`Africa/Freetown`},
  { label: ` Africa/Gaborone`,value:`Africa/Gaborone`},
  { label: ` Africa/Harare`,value:`Africa/Harare`},
  { label: ` Africa/Johannesburg`,value:`Africa/Johannesburg`},
  { label: ` Africa/Juba`,value:`Africa/Juba`},
  { label: ` Africa/Kampala`,value:`Africa/Kampala`},
  { label: ` Africa/Khartoum`,value:`Africa/Khartoum`},
  { label: ` Africa/Kigali`,value:`Africa/Kigali`},
  { label: ` Africa/Kinshasa`,value:`Africa/Kinshasa`},
  { label: ` Africa/Lagos`,value:`Africa/Lagos`},
  { label: ` Africa/Libreville`,value:`Africa/Libreville`},
  { label: `Africa/Lome`,value:`Africa/Lome`},
  { label: ` Africa/Luanda`,value:`Africa/Luanda`},
  { label: ` Africa/Lubumbashi`,value:`Africa/Lubumbashi`},
  { label: ` Africa/Lusaka`,value:`Africa/Lusaka`},
  { label: ` Africa/Malabo`,value:`Africa/Malabo`},
  { label: ` Africa/Maputo`,value:`Africa/Maputo`},
  { label: ` Africa/Maseru`,value:`Africa/Maseru`},
  { label: ` Africa/Mbabane`,value:`Africa/Mbabane`},
  { label: ` Africa/Mogadishu`,value:`Africa/Mogadishu`},
  { label: `Africa/Monrovia`,value:`Africa/Monrovia`},
  { label: ` Africa/Nairobi`,value:`Africa/Nairobi`},
  { label: ` Africa/Ndjamena`,value:`Africa/Ndjamena`},
  { label: ` Africa/Niamey`,value:`Africa/Niamey`},
  { label: `Africa/Nouakchott`,value:`Africa/Nouakchott`},
  { label: `Africa/Ouagadougou`,value:`Africa/Ouagadougou`},
  { label: ` Africa/Porto-Novo`,value:`Africa/Porto-Novo`},
  { label: ` Africa/Sao_Tome`,value:`Africa/Sao_Tome`},
  { label: `Africa/Timbuktu`,value:`Africa/Timbuktu`},
  { label: ` Africa/Tripoli`,value:`Africa/Tripoli`},
  { label: ` Africa/Tunis`,value:`Africa/Tunis`},
  { label: ` Africa/Windhoek`,value:`Africa/Windhoek`},
  { label: `America/Adak`,value:`America/Adak`},
  { label: `America/Anchorage`,value:`America/Anchorage`},
  { label: `America/Anguilla`,value:`America/Anguilla`},
  { label: `America/Antigua`,value:`America/Antigua`},
  { label: `America/Araguaina`,value:`America/Araguaina`},
  { label: `America/Argentina/Buenos_Aires`,value:`America/Argentina/Buenos_Aires`},
  { label: `America/Argentina/Catamarca`,value:`America/Argentina/Catamarca`},
  { label: `America/Argentina/ComodRivadavia`,value:`America/Argentina/ComodRivadavia`},
  { label: `America/Argentina/Cordoba`,value:`America/Argentina/Cordoba`},
  { label: `America/Argentina/Jujuy`,value:`America/Argentina/Jujuy`},
  { label: `America/Argentina/La_Rioja`,value:`America/Argentina/La_Rioja`},
  { label: `America/Argentina/Mendoza`,value:`America/Argentina/Mendoza`},
  { label: `America/Argentina/Rio_Gallegos`,value:`America/Argentina/Rio_Gallegos`},
  { label: `America/Argentina/Salta`,value:`America/Argentina/Salta`},
  { label: `America/Argentina/San_Juan`,value:`America/Argentina/San_Juan`},
  { label: `America/Argentina/San_Luis`,value:`America/Argentina/San_Luis`},
  { label: `America/Argentina/Tucuman`,value:`America/Argentina/Tucuman`},
  { label: `America/Argentina/Ushuaia`,value:`America/Argentina/Ushuaia`},
  { label: `America/Aruba`,value:`America/Aruba`},
  { label: `America/Asuncion`,value:`America/Asuncion`},
  { label: `America/Atikokan`,value:`America/Atikokan`},
  { label: `America/Atka`,value:`America/Atka`},
  { label: `America/Bahia`,value:`America/Bahia`},
  { label: `America/Bahia_Banderas`,value:`America/Bahia_Banderas`},
  { label: `America/Barbados`,value:`America/Barbados`},
  { label: `America/Belem`,value:`America/Belem`},
  { label: `America/Belize`,value:`America/Belize`},
  { label: `America/Blanc-Sablon`,value:`America/Blanc-Sablon`},
  { label: `America/Boa_Vista`,value:`America/Boa_Vista`},
  { label: `America/Bogota`,value:`America/Bogota`},
  { label: `America/Boise`,value:`America/Boise`},
  { label: `America/Buenos_Aires`,value:`America/Buenos_Aires`},
  { label: `America/Cambridge_Bay`,value:`America/Cambridge_Bay`},
  { label: `America/Campo_Grande`,value:`America/Campo_Grande`},
  { label: `America/Cancun`,value:`America/Cancun`},
  { label: `America/Caracas`,value:`America/Caracas`},
  { label: `America/Catamarca`,value:`America/Catamarca`},
  { label: `America/Cayenne`,value:`America/Cayenne`},
  { label: `America/Cayman`,value:`America/Cayman`},
  { label: `America/Chicago`,value:`America/Chicago`},
  { label: `America/Chihuahua`,value:`America/Chihuahua`},
  { label: `America/Coral_Harbour`,value:`America/Coral_Harbour`},
  { label: `America/Cordoba`,value:`America/Cordoba`},
  { label: `America/Costa_Rica`,value:`America/Costa_Rica`},
  { label: `America/Creston`,value:`America/Creston`},
  { label: `America/Cuiaba`,value:`America/Cuiaba`},
  { label: `America/Curacao`,value:`America/Curacao`},
  { label: `America/Danmarkshavn`,value:`America/Danmarkshavn`},
  { label: `America/Dawson`,value:`America/Dawson`},
  { label: `America/Dawson_Creek`,value:`America/Dawson_Creek`},
  { label: `America/Denver`,value:`America/Denver`},
  { label: `America/Detroit`,value:`America/Detroit`},
  { label: `America/Dominica`,value:`America/Dominica`},
  { label: `America/Edmonton`,value:`America/Edmonton`},
  { label: `America/Eirunepe`,value:`America/Eirunepe`},
  { label: `America/El_Salvador`,value:`America/El_Salvador`},
  { label: `America/Ensenada`,value:`America/Ensenada`},
  { label: `America/Fort_Nelson`,value:`America/Fort_Nelson`},
  { label: `America/Fort_Wayne`,value:`America/Fort_Wayne`},
  { label: `America/Fortaleza`,value:`America/Fortaleza`},
  { label: `America/Glace_Bay`,value:`America/Glace_Bay`},
  { label: `America/Godthab`,value:`America/Godthab`},
  { label: `America/Goose_Bay`,value:`America/Goose_Bay`},
  { label: `America/Grand_Turk`,value:`America/Grand_Turk`},
  { label: `America/Grenada`,value:`America/Grenada`},
  { label: `America/Guadeloupe`,value:`America/Guadeloupe`},
  { label: `America/Guatemala`,value:`America/Guatemala`},
  { label: `America/Guayaquil`,value:`America/Guayaquil`},
  { label: `America/Guyana`,value:`America/Guyana`},
  { label: `America/Halifax`,value:`America/Halifax`},
  { label: `America/Havana`,value:`America/Havana`},
  { label: `America/Hermosillo`,value:`America/Hermosillo`},
  { label: `America/Indiana/Indianapolis`,value:`America/Indiana/Indianapolis`},
  { label: `America/Indiana/Knox`,value:`America/Indiana/Knox`},
  { label: `America/Indiana/Marengo`,value:`America/Indiana/Marengo`},
  { label: `America/Indiana/Petersburg`,value:`America/Indiana/Petersburg`},
  { label: `America/Indiana/Tell_City`,value:`America/Indiana/Tell_City`},
  { label: `America/Indiana/Vevay`,value:`America/Indiana/Vevay`},
  { label: `America/Indiana/Vincennes`,value:`America/Indiana/Vincennes`},
  { label: `America/Indiana/Winamac`,value:`America/Indiana/Winamac`},
  { label: `America/Indianapolis`,value:`America/Indianapolis`},
  { label: `America/Inuvik`,value:`America/Inuvik`},
  { label: `America/Iqaluit`,value:`America/Iqaluit`},
  { label: `America/Jamaica`,value:`America/Jamaica`},
  { label: `America/Jujuy`,value:`America/Jujuy`},
  { label: `America/Juneau`,value:`America/Juneau`},
  { label: `America/Kentucky/Louisville`,value:`America/Kentucky/Louisville`},
  { label: `America/Kentucky/Monticello`,value:`America/Kentucky/Monticello`},
  { label: `America/Knox_IN`,value:`America/Knox_IN`},
  { label: `America/Kralendijk`,value:`America/Kralendijk`},
  { label: `America/La_Paz`,value:`America/La_Paz`},
  { label: `America/Lima`,value:`America/Lima`},
  { label: `America/Los_Angeles`,value:`America/Los_Angeles`},
  { label: `America/Louisville`,value:`America/Louisville`},
  { label: `America/Lower_Princes`,value:`America/Lower_Princes`},
  { label: `America/Maceio`,value:`America/Maceio`},
  { label: `America/Managua`,value:`America/Managua`},
  { label: `America/Manaus`,value:`America/Manaus`},
  { label: `America/Marigot`,value:`America/Marigot`},
  { label: `America/Martinique`,value:`America/Martinique`},
  { label: `America/Matamoros`,value:`America/Matamoros`},
  { label: `America/Mazatlan`,value:`America/Mazatlan`},
  { label: `America/Mendoza`,value:`America/Mendoza`},
  { label: `America/Menominee`,value:`America/Menominee`},
  { label: `America/Merida`,value:`America/Merida`},
  { label: `America/Metlakatla`,value:`America/Metlakatla`},
  { label: `America/Mexico_City`,value:`America/Mexico_City`},
  { label: `America/Miquelon`,value:`America/Miquelon`},
  { label: `America/Moncton`,value:`America/Moncton`},
  { label: `America/Monterrey`,value:`America/Monterrey`},
  { label: `America/Montevideo`,value:`America/Montevideo`},
  { label: `America/Montreal`,value:`America/Montreal`},
  { label: `America/Montserrat`,value:`America/Montserrat`},
  { label: `America/Nassau`,value:`America/Nassau`},
  { label: `America/New_York`,value:`America/New_York`},
  { label: `America/Nipigon`,value:`America/Nipigon`},
  { label: `America/Nome`,value:`America/Nome`},
  { label: `America/Noronha`,value:`America/Noronha`},
  { label: `America/North_Dakota/Beulah`,value:`America/North_Dakota/Beulah`},
  { label: `America/North_Dakota/Center`,value:`America/North_Dakota/Center`},
  { label: `America/North_Dakota/New_Salem`,value:`America/North_Dakota/New_Salem`},
  { label: `America/Ojinaga`,value:`America/Ojinaga`},
  { label: `America/Panama`,value:`America/Panama`},
  { label: `America/Pangnirtung`,value:`America/Pangnirtung`},
  { label: `America/Paramaribo`,value:`America/Paramaribo`},
  { label: `America/Phoenix`,value:`America/Phoenix`},
  { label: `America/Port-au-Prince`,value:`America/Port-au-Prince`},
  { label: `America/Port_of_Spain`,value:`America/Port_of_Spain`},
  { label: `America/Porto_Acre`,value:`America/Porto_Acre`},
  { label: `America/Porto_Velho`,value:`America/Porto_Velho`},
  { label: `America/Puerto_Rico`,value:`America/Puerto_Rico`},
  { label: `America/Punta_Arenas`,value:`America/Punta_Arenas`},
  { label: `America/Rainy_River`,value:`America/Rainy_River`},
  { label: `America/Rankin_Inlet`,value:`America/Rankin_Inlet`},
  { label: `America/Recife`,value:`America/Recife`},
  { label: `America/Regina`,value:`America/Regina`},
  { label: `America/Resolute`,value:`America/Resolute`},
  { label: `America/Rio_Branco`,value:`America/Rio_Branco`},
  { label: `America/Rosario`,value:`America/Rosario`},
  { label: `America/Santa_Isabel`,value:`America/Santa_Isabel`},
  { label: `America/Santarem`,value:`America/Santarem`},
  { label: `America/Santiago`,value:`America/Santiago`},
  { label: `America/Santo_Domingo`,value:`America/Santo_Domingo`},
  { label: `America/Sao_Paulo`,value:`America/Sao_Paulo`},
  { label: `America/Scoresbysund`,value:`America/Scoresbysund`},
  { label: `America/Shiprock`,value:`America/Shiprock`},
  { label: `America/Sitka`,value:`America/Sitka`},
  { label: `America/St_Barthelemy`,value:`America/St_Barthelemy`},
  { label: `America/St_Johns`,value:`America/St_Johns`},
  { label: `America/St_Kitts`,value:`America/St_Kitts`},
  { label: `America/St_Lucia`,value:`America/St_Lucia`},
  { label: `America/St_Thomas`,value:`America/St_Thomas`},
  { label: `America/St_Vincent`,value:`America/St_Vincent`},
  { label: `America/Swift_Current`,value:`America/Swift_Current`},
  { label: `America/Tegucigalpa`,value:`America/Tegucigalpa`},
  { label: `America/Thule`,value:`America/Thule`},
  { label: `America/Thunder_Bay`,value:`America/Thunder_Bay`},
  { label: `America/Tijuana`,value:`America/Tijuana`},
  { label: `America/Toronto`,value:`America/Toronto`},
  { label: `America/Tortola`,value:`America/Tortola`},
  { label: `America/Vancouver`,value:`America/Vancouver`},
  { label: `America/Virgin`,value:`America/Virgin`},
  { label: `America/Whitehorse`,value:`America/Whitehorse`},
  { label: `America/Winnipeg`,value:`America/Winnipeg`},
  { label: `America/Yakutat`,value:`America/Yakutat`},
  { label: `America/Yellowknife`,value:`America/Yellowknife`},
  { label: ` Antarctica/Casey`,value:`Antarctica/Casey`},
  { label: ` Antarctica/Davis`,value:`Antarctica/Davis`},
  { label: ` Antarctica/DumontDUrville`,value:`Antarctica/DumontDUrville`},
  { label: ` Antarctica/Macquarie`,value:`Antarctica/Macquarie`},
  { label: ` Antarctica/Mawson`,value:`Antarctica/Mawson`},
  { label: ` Antarctica/McMurdo`,value:`Antarctica/McMurdo`},
  { label: `Antarctica/Palmer`,value:`Antarctica/Palmer`},
  { label: `Antarctica/Rothera`,value:`Antarctica/Rothera`},
  { label: ` Antarctica/South_Pole`,value:`Antarctica/South_Pole`},
  { label: ` Antarctica/Syowa`,value:`Antarctica/Syowa`},
  { label: `Antarctica/Troll`,value:`Antarctica/Troll`},
  { label: ` Antarctica/Vostok`,value:`Antarctica/Vostok`},
  { label: ` Arctic/Longyearbyen`,value:`Arctic/Longyearbyen`},
  { label: ` Asia/Aden`,value:`Asia/Aden`},
  { label: ` Asia/Almaty`,value:`Asia/Almaty`},
  { label: ` Asia/Amman`,value:`Asia/Amman`},
  { label: ` Asia/Anadyr`,value:`Asia/Anadyr`},
  { label: ` Asia/Aqtau`,value:`Asia/Aqtau`},
  { label: ` Asia/Aqtobe`,value:`Asia/Aqtobe`},
  { label: ` Asia/Ashgabat`,value:`Asia/Ashgabat`},
  { label: ` Asia/Ashkhabad`,value:`Asia/Ashkhabad`},
  { label: ` Asia/Atyrau`,value:`Asia/Atyrau`},
  { label: ` Asia/Baghdad`,value:`Asia/Baghdad`},
  { label: ` Asia/Bahrain`,value:`Asia/Bahrain`},
  { label: ` Asia/Baku`,value:`Asia/Baku`},
  { label: ` Asia/Bangkok`,value:`Asia/Bangkok`},
  { label: ` Asia/Barnaul`,value:`Asia/Barnaul`},
  { label: ` Asia/Beirut`,value:`Asia/Beirut`},
  { label: ` Asia/Bishkek`,value:`Asia/Bishkek`},
  { label: ` Asia/Brunei`,value:`Asia/Brunei`},
  { label: ` Asia/Calcutta`,value:`Asia/Calcutta`},
  { label: ` Asia/Chita`,value:`Asia/Chita`},
  { label: ` Asia/Choibalsan`,value:`Asia/Choibalsan`},
  { label: ` Asia/Chongqing`,value:`Asia/Chongqing`},
  { label: ` Asia/Chungking`,value:`Asia/Chungking`},
  { label: ` Asia/Colombo`,value:`Asia/Colombo`},
  { label: ` Asia/Dacca`,value:`Asia/Dacca`},
  { label: ` Asia/Damascus`,value:`Asia/Damascus`},
  { label: ` Asia/Dhaka`,value:`Asia/Dhaka`},
  { label: ` Asia/Dili`,value:`Asia/Dili`},
  { label: ` Asia/Dubai`,value:`Asia/Dubai`},
  { label: ` Asia/Dushanbe`,value:`Asia/Dushanbe`},
  { label: ` Asia/Famagusta`,value:`Asia/Famagusta`},
  { label: ` Asia/Gaza`,value:`Asia/Gaza`},
  { label: ` Asia/Harbin`,value:`Asia/Harbin`},
  { label: ` Asia/Hebron`,value:`Asia/Hebron`},
  { label: ` Asia/Ho_Chi_Minh`,value:`Asia/Ho_Chi_Minh`},
  { label: ` Asia/Hong_Kong`,value:`Asia/Hong_Kong`},
  { label: ` Asia/Hovd`,value:`Asia/Hovd`},
  { label: ` Asia/Irkutsk`,value:`Asia/Irkutsk`},
  { label: ` Asia/Istanbul`,value:`Asia/Istanbul`},
  { label: ` Asia/Jakarta`,value:`Asia/Jakarta`},
  { label: ` Asia/Jayapura`,value:`Asia/Jayapura`},
  { label: ` Asia/Jerusalem`,value:`Asia/Jerusalem`},
  { label: ` Asia/Kabul`,value:`Asia/Kabul`},
  { label: ` Asia/Kamchatka`,value:`Asia/Kamchatka`},
  { label: ` Asia/Karachi`,value:`Asia/Karachi`},
  { label: ` Asia/Kashgar`,value:`Asia/Kashgar`},
  { label: ` Asia/Kathmandu`,value:`Asia/Kathmandu`},
  { label: ` Asia/Katmandu`,value:`Asia/Katmandu`},
  { label: ` Asia/Khandyga`,value:`Asia/Khandyga`},
  { label: ` Asia/Kolkata`,value:`Asia/Kolkata`},
  { label: ` Asia/Krasnoyarsk`,value:`Asia/Krasnoyarsk`},
  { label: ` Asia/Kuala_Lumpur`,value:`Asia/Kuala_Lumpur`},
  { label: ` Asia/Kuching`,value:`Asia/Kuching`},
  { label: ` Asia/Kuwait`,value:`Asia/Kuwait`},
  { label: ` Asia/Macao`,value:`Asia/Macao`},
  { label: ` Asia/Macau`,value:`Asia/Macau`},
  { label: ` Asia/Magadan`,value:`Asia/Magadan`},
  { label: ` Asia/Makassar`,value:`Asia/Makassar`},
  { label: ` Asia/Manila`,value:`Asia/Manila`},
  { label: ` Asia/Muscat`,value:`Asia/Muscat`},
  { label: ` Asia/Nicosia`,value:`Asia/Nicosia`},
  { label: ` Asia/Novokuznetsk`,value:`Asia/Novokuznetsk`},
  { label: ` Asia/Novosibirsk`,value:`Asia/Novosibirsk`},
  { label: ` Asia/Omsk`,value:`Asia/Omsk`},
  { label: ` Asia/Oral`,value:`Asia/Oral`},
  { label: ` Asia/Phnom_Penh`,value:`Asia/Phnom_Penh`},
  { label: ` Asia/Pontianak`,value:`Asia/Pontianak`},
  { label: ` Asia/Pyongyang`,value:`Asia/Pyongyang`},
  { label: ` Asia/Qatar`,value:`Asia/Qatar`},
  { label: ` Asia/Qyzylorda`,value:`Asia/Qyzylorda`},
  { label: ` Asia/Rangoon`,value:`Asia/Rangoon`},
  { label: ` Asia/Riyadh`,value:`Asia/Riyadh`},
  { label: ` Asia/Saigon`,value:`Asia/Saigon`},
  { label: ` Asia/Sakhalin`,value:`Asia/Sakhalin`},
  { label: ` Asia/Samarkand`,value:`Asia/Samarkand`},
  { label: ` Asia/Seoul`,value:`Asia/Seoul`},
  { label: ` Asia/Shanghai`,value:`Asia/Shanghai`},
  { label: ` Asia/Singapore`,value:`Asia/Singapore`},
  { label: ` Asia/Srednekolymsk`,value:`Asia/Srednekolymsk`},
  { label: ` Asia/Taipei`,value:`Asia/Taipei`},
  { label: ` Asia/Tashkent`,value:`Asia/Tashkent`},
  { label: ` Asia/Tbilisi`,value:`Asia/Tbilisi`},
  { label: ` Asia/Tehran`,value:`Asia/Tehran`},
  { label: ` Asia/Tel_Aviv`,value:`Asia/Tel_Aviv`},
  { label: ` Asia/Thimbu`,value:`Asia/Thimbu`},
  { label: ` Asia/Thimphu`,value:`Asia/Thimphu`},
  { label: ` Asia/Tokyo`,value:`Asia/Tokyo`},
  { label: ` Asia/Tomsk`,value:`Asia/Tomsk`},
  { label: ` Asia/Ujung_Pandang`,value:`Asia/Ujung_Pandang`},
  { label: ` Asia/Ulaanbaatar`,value:`Asia/Ulaanbaatar`},
  { label: ` Asia/Ulan_Bator`,value:`Asia/Ulan_Bator`},
  { label: ` Asia/Urumqi`,value:`Asia/Urumqi`},
  { label: ` Asia/Ust-Nera`,value:`Asia/Ust-Nera`},
  { label: ` Asia/Vientiane`,value:`Asia/Vientiane`},
  { label: ` Asia/Vladivostok`,value:`Asia/Vladivostok`},
  { label: ` Asia/Yakutsk`,value:`Asia/Yakutsk`},
  { label: ` Asia/Yangon`,value:`Asia/Yangon`},
  { label: ` Asia/Yekaterinburg`,value:`Asia/Yekaterinburg`},
  { label: ` Asia/Yerevan`,value:`Asia/Yerevan`},
  { label: `Atlantic/Azores`,value:`Atlantic/Azores`},
  { label: `Atlantic/Bermuda`,value:`Atlantic/Bermuda`},
  { label: `Atlantic/Canary`,value:`Atlantic/Canary`},
  { label: `Atlantic/Cape_Verde`,value:`Atlantic/Cape_Verde`},
  { label: `Atlantic/Faeroe`,value:`Atlantic/Faeroe`},
  { label: `Atlantic/Faroe`,value:`Atlantic/Faroe`},
  { label: ` Atlantic/Jan_Mayen`,value:`Atlantic/Jan_Mayen`},
  { label: `Atlantic/Madeira`,value:`Atlantic/Madeira`},
  { label: `Atlantic/Reykjavik`,value:`Atlantic/Reykjavik`},
  { label: `Atlantic/South_Georgia`,value:`Atlantic/South_Georgia`},
  { label: `Atlantic/St_Helena`,value:`Atlantic/St_Helena`},
  { label: `Atlantic/Stanley`,value:`Atlantic/Stanley`},
  { label: ` Australia/ACT`,value:`Australia/ACT`},
  { label: ` Australia/Adelaide`,value:`Australia/Adelaide`},
  { label: ` Australia/Brisbane`,value:`Australia/Brisbane`},
  { label: ` Australia/Broken_Hill`,value:`Australia/Broken_Hill`},
  { label: ` Australia/Canberra`,value:`Australia/Canberra`},
  { label: ` Australia/Currie`,value:`Australia/Currie`},
  { label: ` Australia/Darwin`,value:`Australia/Darwin`},
  { label: ` Australia/Eucla`,value:`Australia/Eucla`},
  { label: ` Australia/Hobart`,value:`Australia/Hobart`},
  { label: ` Australia/LHI`,value:`Australia/LHI`},
  { label: ` Australia/Lindeman`,value:`Australia/Lindeman`},
  { label: ` Australia/Lord_Howe`,value:`Australia/Lord_Howe`},
  { label: ` Australia/Melbourne`,value:`Australia/Melbourne`},
  { label: ` Australia/NSW`,value:`Australia/NSW`},
  { label: ` Australia/North`,value:`Australia/North`},
  { label: ` Australia/Perth`,value:`Australia/Perth`},
  { label: ` Australia/Queensland`,value:`Australia/Queensland`},
  { label: ` Australia/South`,value:`Australia/South`},
  { label: ` Australia/Sydney`,value:`Australia/Sydney`},
  { label: ` Australia/Tasmania`,value:`Australia/Tasmania`},
  { label: ` Australia/Victoria`,value:`Australia/Victoria`},
  { label: ` Australia/West`,value:`Australia/West`},
  { label: ` Australia/Yancowinna`,value:`Australia/Yancowinna`},
  { label: `Brazil/Acre`,value:`Brazil/Acre`},
  { label: `Brazil/DeNoronha`,value:`Brazil/DeNoronha`},
  { label: `Brazil/East`,value:`Brazil/East`},
  { label: `Brazil/West`,value:`Brazil/West`},
  { label: ` CET`,value:`CET`},
  { label: `CST6CDT`,value:`CST6CDT`},
  { label: `Canada/Atlantic`,value:`Canada/Atlantic`},
  { label: `Canada/Central`,value:`Canada/Central`},
  { label: `Canada/Eastern`,value:`Canada/Eastern`},
  { label: `Canada/Mountain`,value:`Canada/Mountain`},
  { label: `Canada/Newfoundland`,value:`Canada/Newfoundland`},
  { label: `Canada/Pacific`,value:`Canada/Pacific`},
  { label: `Canada/Saskatchewan`,value:`Canada/Saskatchewan`},
  { label: `Canada/Yukon`,value:`Canada/Yukon`},
  { label: `Chile/Continental`,value:`Chile/Continental`},
  { label: `Chile/EasterIsland`,value:`Chile/EasterIsland`},
  { label: `Cuba`,value:`Cuba`},
  { label: ` EET`,value:`EET`},
  { label: `EST5EDT`,value:`EST5EDT`},
  { label: ` Egypt`,value:`Egypt`},
  { label: `Eire`,value:`Eire`},
  { label: `Etc/GMT`,value:`Etc/GMT`},
  { label: `Etc/GMT+0`,value:`Etc/GMT+0`},
  { label: `Etc/GMT+1`,value:`Etc/GMT+1`},
  { label: `Etc/GMT+10`,value:`Etc/GMT+10`},
  { label: `Etc/GMT+11`,value:`Etc/GMT+11`},
  { label: `Etc/GMT+12`,value:`Etc/GMT+12`},
  { label: `Etc/GMT+2`,value:`Etc/GMT+2`},
  { label: `Etc/GMT+3`,value:`Etc/GMT+3`},
  { label: `Etc/GMT+4`,value:`Etc/GMT+4`},
  { label: `Etc/GMT+5`,value:`Etc/GMT+5`},
  { label: `Etc/GMT+6`,value:`Etc/GMT+6`},
  { label: `Etc/GMT+7`,value:`Etc/GMT+7`},
  { label: `Etc/GMT+8`,value:`Etc/GMT+8`},
  { label: `Etc/GMT+9`,value:`Etc/GMT+9`},
  { label: `Etc/GMT-0`,value:`Etc/GMT-0`},
  { label: ` Etc/GMT-1`,value:`Etc/GMT-1`},
  { label: ` Etc/GMT-10`,value:`Etc/GMT-10`},
  { label: ` Etc/GMT-11`,value:`Etc/GMT-11`},
  { label: ` Etc/GMT-12`,value:`Etc/GMT-12`},
  { label: ` Etc/GMT-13`,value:`Etc/GMT-13`},
  { label: ` Etc/GMT-14`,value:`Etc/GMT-14`},
  { label: ` Etc/GMT-2`,value:`Etc/GMT-2`},
  { label: ` Etc/GMT-3`,value:`Etc/GMT-3`},
  { label: ` Etc/GMT-4`,value:`Etc/GMT-4`},
  { label: ` Etc/GMT-5`,value:`Etc/GMT-5`},
  { label: ` Etc/GMT-6`,value:`Etc/GMT-6`},
  { label: ` Etc/GMT-7`,value:`Etc/GMT-7`},
  { label: ` Etc/GMT-8`,value:`Etc/GMT-8`},
  { label: ` Etc/GMT-9`,value:`Etc/GMT-9`},
  { label: `Etc/GMT0`,value:`Etc/GMT0`},
  { label: `Etc/Greenwich`,value:`Etc/Greenwich`},
  { label: `Etc/UCT`,value:`Etc/UCT`},
  { label: `Etc/UTC`,value:`Etc/UTC`},
  { label: `Etc/Universal`,value:`Etc/Universal`},
  { label: `Etc/Zulu`,value:`Etc/Zulu`},
  { label: ` Europe/Amsterdam`,value:`Europe/Amsterdam`},
  { label: ` Europe/Andorra`,value:`Europe/Andorra`},
  { label: ` Europe/Astrakhan`,value:`Europe/Astrakhan`},
  { label: ` Europe/Athens`,value:`Europe/Athens`},
  { label: `Europe/Belfast`,value:`Europe/Belfast`},
  { label: ` Europe/Belgrade`,value:`Europe/Belgrade`},
  { label: ` Europe/Berlin`,value:`Europe/Berlin`},
  { label: ` Europe/Bratislava`,value:`Europe/Bratislava`},
  { label: ` Europe/Brussels`,value:`Europe/Brussels`},
  { label: ` Europe/Bucharest`,value:`Europe/Bucharest`},
  { label: ` Europe/Budapest`,value:`Europe/Budapest`},
  { label: ` Europe/Busingen`,value:`Europe/Busingen`},
  { label: ` Europe/Chisinau`,value:`Europe/Chisinau`},
  { label: ` Europe/Copenhagen`,value:`Europe/Copenhagen`},
  { label: `Europe/Dublin`,value:`Europe/Dublin`},
  { label: ` Europe/Gibraltar`,value:`Europe/Gibraltar`},
  { label: `Europe/Guernsey`,value:`Europe/Guernsey`},
  { label: ` Europe/Helsinki`,value:`Europe/Helsinki`},
  { label: `Europe/Isle_of_Man`,value:`Europe/Isle_of_Man`},
  { label: ` Europe/Istanbul`,value:`Europe/Istanbul`},
  { label: `Europe/Jersey`,value:`Europe/Jersey`},
  { label: ` Europe/Kaliningrad`,value:`Europe/Kaliningrad`},
  { label: ` Europe/Kiev`,value:`Europe/Kiev`},
  { label: ` Europe/Kirov`,value:`Europe/Kirov`},
  { label: `Europe/Lisbon`,value:`Europe/Lisbon`},
  { label: ` Europe/Ljubljana`,value:`Europe/Ljubljana`},
  { label: `Europe/London`,value:`Europe/London`},
  { label: ` Europe/Luxembourg`,value:`Europe/Luxembourg`},
  { label: ` Europe/Madrid`,value:`Europe/Madrid`},
  { label: ` Europe/Malta`,value:`Europe/Malta`},
  { label: ` Europe/Mariehamn`,value:`Europe/Mariehamn`},
  { label: ` Europe/Minsk`,value:`Europe/Minsk`},
  { label: ` Europe/Monaco`,value:`Europe/Monaco`},
  { label: ` Europe/Moscow`,value:`Europe/Moscow`},
  { label: ` Europe/Nicosia`,value:`Europe/Nicosia`},
  { label: ` Europe/Oslo`,value:`Europe/Oslo`},
  { label: ` Europe/Paris`,value:`Europe/Paris`},
  { label: ` Europe/Podgorica`,value:`Europe/Podgorica`},
  { label: ` Europe/Prague`,value:`Europe/Prague`},
  { label: ` Europe/Riga`,value:`Europe/Riga`},
  { label: ` Europe/Rome`,value:`Europe/Rome`},
  { label: ` Europe/Samara`,value:`Europe/Samara`},
  { label: ` Europe/San_Marino`,value:`Europe/San_Marino`},
  { label: ` Europe/Sarajevo`,value:`Europe/Sarajevo`},
  { label: ` Europe/Saratov`,value:`Europe/Saratov`},
  { label: ` Europe/Simferopol`,value:`Europe/Simferopol`},
  { label: ` Europe/Skopje`,value:`Europe/Skopje`},
  { label: ` Europe/Sofia`,value:`Europe/Sofia`},
  { label: ` Europe/Stockholm`,value:`Europe/Stockholm`},
  { label: ` Europe/Tallinn`,value:`Europe/Tallinn`},
  { label: ` Europe/Tirane`,value:`Europe/Tirane`},
  { label: ` Europe/Tiraspol`,value:`Europe/Tiraspol`},
  { label: ` Europe/Ulyanovsk`,value:`Europe/Ulyanovsk`},
  { label: ` Europe/Uzhgorod`,value:`Europe/Uzhgorod`},
  { label: ` Europe/Vaduz`,value:`Europe/Vaduz`},
  { label: ` Europe/Vatican`,value:`Europe/Vatican`},
  { label: ` Europe/Vienna`,value:`Europe/Vienna`},
  { label: ` Europe/Vilnius`,value:`Europe/Vilnius`},
  { label: ` Europe/Volgograd`,value:`Europe/Volgograd`},
  { label: ` Europe/Warsaw`,value:`Europe/Warsaw`},
  { label: ` Europe/Zagreb`,value:`Europe/Zagreb`},
  { label: ` Europe/Zaporozhye`,value:`Europe/Zaporozhye`},
  { label: ` Europe/Zurich`,value:`Europe/Zurich`},
  { label: `GB`,value:`GB`},
  { label: `GB-Eire`,value:`GB-Eire`},
  { label: `GMT`,value:`GMT`},
  { label: `GMT0`,value:`GMT0`},
  { label: `Greenwich`,value:`Greenwich`},
  { label: ` Hongkong`,value:`Hongkong`},
  { label: `Iceland`,value:`Iceland`},
  { label: ` Indian/Antananarivo`,value:`Indian/Antananarivo`},
  { label: ` Indian/Chagos`,value:`Indian/Chagos`},
  { label: ` Indian/Christmas`,value:`Indian/Christmas`},
  { label: ` Indian/Cocos`,value:`Indian/Cocos`},
  { label: ` Indian/Comoro`,value:`Indian/Comoro`},
  { label: ` Indian/Kerguelen`,value:`Indian/Kerguelen`},
  { label: ` Indian/Mahe`,value:`Indian/Mahe`},
  { label: ` Indian/Maldives`,value:`Indian/Maldives`},
  { label: ` Indian/Mauritius`,value:`Indian/Mauritius`},
  { label: ` Indian/Mayotte`,value:`Indian/Mayotte`},
  { label: ` Indian/Reunion`,value:`Indian/Reunion`},
  { label: ` Iran`,value:`Iran`},
  { label: ` Israel`,value:`Israel`},
  { label: `Jamaica`,value:`Jamaica`},
  { label: ` Japan`,value:`Japan`},
  { label: ` Kwajalein`,value:`Kwajalein`},
  { label: ` Libya`,value:`Libya`},
  { label: ` MET`,value:`MET`},
  { label: `MST7MDT`,value:`MST7MDT`},
  { label: `Mexico/BajaNorte`,value:`Mexico/BajaNorte`},
  { label: `Mexico/BajaSur`,value:`Mexico/BajaSur`},
  { label: `Mexico/General`,value:`Mexico/General`},
  { label: ` NZ`,value:`NZ`},
  { label: ` NZ-CHAT`,value:`NZ-CHAT`},
  { label: `Navajo`,value:`Navajo`},
  { label: ` PRC`,value:`PRC`},
  { label: `PST8PDT`,value:`PST8PDT`},
  { label: ` Pacific/Apia`,value:`Pacific/Apia`},
  { label: ` Pacific/Auckland`,value:`Pacific/Auckland`},
  { label: ` Pacific/Bougainville`,value:`Pacific/Bougainville`},
  { label: ` Pacific/Chatham`,value:`Pacific/Chatham`},
  { label: ` Pacific/Chuuk`,value:`Pacific/Chuuk`},
  { label: `Pacific/Easter`,value:`Pacific/Easter`},
  { label: ` Pacific/Efate`,value:`Pacific/Efate`},
  { label: ` Pacific/Enderbury`,value:`Pacific/Enderbury`},
  { label: ` Pacific/Fakaofo`,value:`Pacific/Fakaofo`},
  { label: ` Pacific/Fiji`,value:`Pacific/Fiji`},
  { label: ` Pacific/Funafuti`,value:`Pacific/Funafuti`},
  { label: `Pacific/Galapagos`,value:`Pacific/Galapagos`},
  { label: `Pacific/Gambier`,value:`Pacific/Gambier`},
  { label: ` Pacific/Guadalcanal`,value:`Pacific/Guadalcanal`},
  { label: ` Pacific/Guam`,value:`Pacific/Guam`},
  { label: `Pacific/Honolulu`,value:`Pacific/Honolulu`},
  { label: `Pacific/Johnston`,value:`Pacific/Johnston`},
  { label: ` Pacific/Kiritimati`,value:`Pacific/Kiritimati`},
  { label: ` Pacific/Kosrae`,value:`Pacific/Kosrae`},
  { label: ` Pacific/Kwajalein`,value:`Pacific/Kwajalein`},
  { label: ` Pacific/Majuro`,value:`Pacific/Majuro`},
  { label: `Pacific/Marquesas`,value:`Pacific/Marquesas`},
  { label: `Pacific/Midway`,value:`Pacific/Midway`},
  { label: ` Pacific/Nauru`,value:`Pacific/Nauru`},
  { label: `Pacific/Niue`,value:`Pacific/Niue`},
  { label: ` Pacific/Norfolk`,value:`Pacific/Norfolk`},
  { label: ` Pacific/Noumea`,value:`Pacific/Noumea`},
  { label: `Pacific/Pago_Pago`,value:`Pacific/Pago_Pago`},
  { label: ` Pacific/Palau`,value:`Pacific/Palau`},
  { label: `Pacific/Pitcairn`,value:`Pacific/Pitcairn`},
  { label: ` Pacific/Pohnpei`,value:`Pacific/Pohnpei`},
  { label: ` Pacific/Ponape`,value:`Pacific/Ponape`},
  { label: ` Pacific/Port_Moresby`,value:`Pacific/Port_Moresby`},
  { label: `Pacific/Rarotonga`,value:`Pacific/Rarotonga`},
  { label: ` Pacific/Saipan`,value:`Pacific/Saipan`},
  { label: `Pacific/Samoa`,value:`Pacific/Samoa`},
  { label: `Pacific/Tahiti`,value:`Pacific/Tahiti`},
  { label: ` Pacific/Tarawa`,value:`Pacific/Tarawa`},
  { label: ` Pacific/Tongatapu`,value:`Pacific/Tongatapu`},
  { label: ` Pacific/Truk`,value:`Pacific/Truk`},
  { label: ` Pacific/Wake`,value:`Pacific/Wake`},
  { label: ` Pacific/Wallis`,value:`Pacific/Wallis`},
  { label: ` Pacific/Yap`,value:`Pacific/Yap`},
  { label: ` Poland`,value:`Poland`},
  { label: `Portugal`,value:`Portugal`},
  { label: ` ROK`,value:`ROK`},
  { label: ` Singapore`,value:`Singapore`},
  { label: `SystemV/AST4`,value:`SystemV/AST4`},
  { label: `SystemV/AST4ADT`,value:`SystemV/AST4ADT`},
  { label: `SystemV/CST6`,value:`SystemV/CST6`},
  { label: `SystemV/CST6CDT`,value:`SystemV/CST6CDT`},
  { label: `SystemV/EST5`,value:`SystemV/EST5`},
  { label: `SystemV/EST5EDT`,value:`SystemV/EST5EDT`},
  { label: `SystemV/HST10`,value:`SystemV/HST10`},
  { label: `SystemV/MST7`,value:`SystemV/MST7`},
  { label: `SystemV/MST7MDT`,value:`SystemV/MST7MDT`},
  { label: `SystemV/PST8`,value:`SystemV/PST8`},
  { label: `SystemV/PST8PDT`,value:`SystemV/PST8PDT`},
  { label: `SystemV/YST9`,value:`SystemV/YST9`},
  { label: `SystemV/YST9YDT`,value:`SystemV/YST9YDT`},
  { label: ` Turkey`,value:`Turkey`},
  { label: `UCT`,value:`UCT`},
  { label: `US/Alaska`,value:`US/Alaska`},
  { label: `US/Aleutian`,value:`US/Aleutian`},
  { label: `US/Arizona`,value:`US/Arizona`},
  { label: `US/Central`,value:`US/Central`},
  { label: `US/East-Indiana`,value:`US/East-Indiana`},
  { label: `US/Eastern`,value:`US/Eastern`},
  { label: `US/Hawaii`,value:`US/Hawaii`},
  { label: `US/Indiana-Starke`,value:`US/Indiana-Starke`},
  { label: `US/Michigan`,value:`US/Michigan`},
  { label: `US/Mountain`,value:`US/Mountain`},
  { label: `US/Pacific`,value:`US/Pacific`},
  { label: `US/Pacific-New`,value:`US/Pacific-New`},
  { label: `US/Samoa`,value:`US/Samoa`},
  { label: `UTC`,value:`UTC`},
  { label: `Universal`,value:`Universal`},
  { label: ` W-SU`,value:`W-SU`},
  { label: `WET`,value:`WET`},
  { label: `Zulu`,value:`Zulu`},
  { label: `EST`,value:`EST`},
  { label: `HST`,value:`HST`},
  { label: `MST`,value:`MST`},
  { label: ` ACT`,value:`ACT`},
  { label: ` AET`,value:`AET`},
  { label: `AGT`,value:`AGT`},
  { label: ` ART`,value:`ART`},
  { label: `AST`,value:`AST`},
  { label: `BET`,value:`BET`},
  { label: ` BST`,value:`BST`},
  { label: ` CAT`,value:`CAT`},
  { label: `CNT`,value:`CNT`},
  { label: `CST`,value:`CST`},
  { label: ` CTT`,value:`CTT`},
  { label: ` EAT`,value:`EAT`},
  { label: ` ECT`,value:`ECT`},
  { label: `IET`,value:`IET`},
  { label: ` IST`,value:`IST`},
  { label: ` JST`,value:`JST`},
  { label: ` MIT`,value:`MIT`},
  { label: ` NET`,value:`NET`},
  { label: ` NST`,value:`NST`},
  { label: ` PLT`,value:`PLT`},
  { label: `PNT`,value:`PNT`},
  { label: `PRT`,value:`PRT`},
  { label: `PST`,value:`PST`},
  { label: ` SST`,value:`SST`},
  { label: ` VST`,value:`VST`}
    
];


const KrrConfig = {
  topAnswerLimit: 5
};

export default {
  brandingInfoCss,
  AlertConfigType,
  TimelineType,
  TimelineIcon,
  TimelineTitle,
  WizardMenus,
  WizardMenuPath,
  MenuConfig,
  SocketConfig,
  IdleTimeConfig,
  LangConfig,
  StepMenus,
  StepTypes,
  DefaultTableConfig,
  DataTypes,
  ExpressionOperators,
  ExpressionOperatorsConfig,
  getMainMenuList,
  ApiBasePath,
  CalendarCredential,
  Timezones,
  AuthenticationMethods,
  WeekDays,
  httpMethods,
  FileTypes,
  VideoSizeLimit,
  ImageSizeLimit,
  ImageFileTypes,
  VideoFileTypes,
  KrrConfig,
  VideoFileTypesDisplay,
  ImageFileTypesDisplay,
  ChatBotProperties,
  WizardPath,
  AccountType,
  MultiContextBotType,
  defaultBotProperties,
  defaultMultiLocationField,
  wizardMenuForSingleLocation,
  contactTopTabs
};
