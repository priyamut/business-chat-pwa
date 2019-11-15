const SocketConfig = {
    subscribeTopicPrefix: '/topic',
    messageInitializeTopic: '/app/chat.clientConnected',
    messageTopic: '/app/chat.sendMessage',
    join: '/app/chat.join',
    leave: '/app/chat.leave',
    archive: '/app/chat.archive',
    event: '/app/chat.event',
    heartbeat: 10
};

// const ProcessorConfig = {
//     storeRefreshInterval: 1 * 1000,
//     versionCheckInterval: 120 * 1000,
//     chatActiveTimeCheckInterval : 300 * 1000,
//     messageProcessInterval: 1 * 1000,
//     typingProcessInterval:2*1000
// };

// const EventPayloadType={

//     CHAT_REFRESH_EVENT:'Refresh_Click',
//     CALL_EVENT:'Phone_Call',
//     SEND_EVENT:'Send_Click',
//     MIC_ON_EVENT:'Mic_On',
//     MIC_OFF_EVENT:'Mic_Off',
//     MIC_TEXT:'Mic_Text',
//     DESKTOP_CALL_CLICK_EVENT:'Desktop_Phone_Click',
//     PERM_MAINMENU_EVENT:'PermanentMenu_MainMenu_Select',
//     PERM_HANDOVERTOHUMAN_EVENT:'PermanentMenu_HandOverToHuman_Select',
//     CHAT_OPEN_BY_MEDIUM_PROMPT:'MediumWindow_OpenFullWindow',
//     CHAT_OPEN_BY_SMALL_PROMPT:'SmallWindow_OpenFullWindow',
//     MEDIUM_PROMPT_CLOSE:'MediumWindow_Close',
//     CHAT_OPEN_BY_INITIATE:'FullWindow_Initiate',
//     CHAT_OPEN_BY_NAVIGATE:'FullWindow_Load',
//     CHAT_LATE_RESPONSE_START:'Chat_LaterReponse_Started',
//     CHAT_LATE_REPONSE_STOP:'Chat_LateResponse_ended',
//     CHAT_CLOSE:'FullWindow_Close',
//     MEDIUM_PROMPT_OPEN_ON_NAVIGATION:'MediumWindow_ShowOnNavigation',
//     SMALL_PROMPT_OPEN_ON_NAVIGATION:'SmallWindow_ShowOnNavigation',
//     BROWSER_TAB_CLOSE:'BrowserTab_Close',
//     CHAT_LATE_RESPONSE_START:'Chat_lateResponse_started',
//     CHAT_LATE_RESPONSE_STOP:'Chat_lateResponse_stopped'

// }


// const chatStatus={
//     EXPIRED:'EXPIRED',
//     IN_PROGRESS:'IN_PROGRESS',
//     JOINED:'JOINED',
//     DONE:'DONE',
//     IN_PROGRESS_AFTER_TTH:'IN_PROGRESS_AFTER_TTH',
//     TALK_TO_HUMAN:'TALK_TO_HUMAN',
//     IN_PROGRESS_AFTER_TTH_FALLBACK:'IN_PROGRESS_AFTER_TTH_FALLBACK',
//     EXPIRED:'EXPIRED'
// }

// const multiLocationContext = {
//     MENU_LENGTH:10
// }

// const PayloadType = {
//     START_TYPING: 'START_TYPING',
//     STOP_TYPING: 'STOP_TYPING',
//     WELCOME: 'WELCOME',
//     TEXT: 'TEXT',
//     IMAGE: 'IMAGE_CAROUSEL',
//     VIDEO: 'VIDEO_CAROUSEL',
//     FEEDBACK: 'FEEDBACK',
//     QUICK_ACTION: 'QUICK_REPLY_ACTION',
//     LIST_VIEW: 'LIST_VIEW',
//     MULTI_LIST_VIEW: 'MULTI_LIST_VIEW',
//     FORCE_JOIN_CONVERSATION:'FORCE_JOIN',
//     JOIN_CONVERSATION: 'JOIN', //JOIN
//     LEAVE_CONVERSATION: 'LEAVE',
//     ARCHIVE_CONVERSATION: 'ARCHIVE',
//     TALK_TO_HUMAN_REQUEST: 'TALK_TO_HUMAN_REQUEST',
//     NEW_USER_REQUEST:'NEW_USER_REQUEST',
//     CONTACT_INFO:'CONTACT_INFO',
//     TALK_TO_HUMAN_END: 'TALK_TO_HUMAN_END',
//     CHAT_WINDOW_EVENT:'CHAT_WINDOW_EVENT',
//     CONTEXTSETTING:'CONTEXTSETTING',
//     FORMINPUT:'FORM_INPUT',
//     FORMINPUT_SUGGESTION:'FORM_INPUT_WITH_KRR',
//     LATE_RESPONSE:'LATE_RESPONSE',
//     INITIAL_TYPE:'INITAL_PAYLOAD'
// };



// const PayloadReadTimeConfig = {
//     GENERAL: {
//         READTIME: {
//             IMG: 2,
//             LINE: 0.6//0.8
//         },
//         CRITERIA: {
//             NO_OF_WORDS_PER_LINE: 5,
//             MAX_IMAGE_READING_SEC: 6,
//             MAX_VIDEO_READING_SEC: 6
//         }
//     }
// };

// const ConversationTab = {
//     LIVESUPPORT : 1,
//     LIVETAB:0,
//     ALL:-1
// }

// const AgentConfig = {
//     WELCOME_CONFIG: 'Welcome_Config',
//     DEFAULT_TIMEZONE: 'America/Los_Angeles',
//     DEFAULT_TIME_FORMAT: 'ddd MMM DD YYYY HH:mm:ss z'
// };

// const SenderType = {
//     Agent: 'BOT',
//     Business: 'BUSINESS',
//     Consumer: 'CONSUMER'
// };

// const LocalStorageAction={
//     Add:'LOCALSTORAGE_ADD',
//     Remove:'LOCALSTORAGE_REMOVE',
//     Get:'LOCALSTORAGE_GET'
// }

// const CarouselSetting = {
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: true,
//     centerMode: true,
//     focusOnSelect: true,
//     variableWidth:false,
//     useTransform:true
// }

const ResourceConfig = {
    envGetResource: '/envInfo',
    versionGetResource: '/botVersion',
    apiConfigUrlResource:'/apiConfigUrl',
    alertNotificationResource:'/notifyUrl'
};

// const ModeConfig = {
//     BUSINESS: 'business',
//     PREVIEW: 'preview',
//     BUSINESS_LS:'business_livesupport',
//     BUSINESS_PREVIEW:'business_preview',
//     TRANSCRIPT:'Transcript',
//     LIVEVIEW:'Business_LiveView',
//     SINGLE_LIVEWVIEW:'Single_LiveView',
//     SINGLE_TRANSCRIPT:'Single_Transcript'

// };


// const ExceptionType={
//     UI_Exception:"UI_EXCEPTION",
//     UI_Message:"UI_MESSAGE"
// };

// const Callback = {
//     CALL_ME_BACK: "call me back"
// }

// const MenuConfig = {
//     preview: {
//         menus: [
//             { value: 'Main menu', label: 'Main menu' },
//             { value: 'Handover to Human', label: 'Handover to Human' },
//         ]
//     },
//     business_preview: {
//         menus: [
//             { value: 'Main menu', label: 'Main menu' },
//             { value: 'Handover to Human', label: 'Handover to Human' },
//         ]
//     },
//     business: { menus: [] },
// }

// const LiveSupport = {
//     menus:[
//         // { value: 'join', label: 'Join' },
//         { value: 'leave', label: 'Leave' },
//         { value: 'archive', label: 'Archive' }, 
//     ],
//     liveViewMenu:[
//         { value: 'leave', label: 'Leave' }
//     ]
// }

// const LiveSupportArchive = {
//     menus:[
//         { value: 'archive', label: 'Archive' }, 
//     ]
// }

export {
    SocketConfig,
    ResourceConfig
    // ConversationTab,
    // ResourceConfig,
    // ProcessorConfig,
    // PayloadType,
    // PayloadReadTimeConfig,
    // SenderType,
    // AgentConfig,
    // EventPayloadType,
    // CarouselSetting,
    // ModeConfig,
    // LocalStorageAction,
    // MenuConfig,
    // ExceptionType,
    // Callback,
    // LiveSupport,
    // LiveSupportArchive,
    // multiLocationContext,
    // chatStatus
};
