export const ToastOptions = {
    position: 'top-right'
}
export const styleMap = {
    FS1: {
        fontSize: 16 + 'px',
    },

}

export const ResultStatus = {
    SUCCESS: 'success',
    FAIL: 'failure'
}

export const ChatUserRole = {
    ADMIN: 1,
    STAFF: 2,
    ASSISTANT: 3,
    PROVIDER: 4,
    PATIENT: 5,
    SCRIBE: 6,
    SUPERVISOR: 7,
    SYSTEM: 8,
    BOT: 9
}

export const ChatMode = {
    PUBLIC: 1,
    PRIVATE: 2
}

export const MessageCategory = {
    URGENT: 2,
    PRIORITY: 3,
}

export const RoomType = {
    PRIVATE: 1,
    PUBLIC: 2,
    PROVIDER_TO_PATIENT: 3,
    PROVIDER_TO_SCRIBE: 4,
    PROVIDER_TO_STAFF: 5,
    SCRIBE_TO_STAFF: 6,
    TRANSCRIPTION: 7,
    PROVIDER_TO_SCRIBE_TO_PATIENT: 8,
    PROVIDER_TO_STAFF_TO_PATIENT: 9,
}

export const AggregationType = {
    DRAFT: 'draft',
    PRIORITY: 'priority',
    URGENT: 'urgent',
    FOLLOWED: 'followed',
    REPLY: 'reply',
    SUBSCRIPTION: 'subscription',
    SUBSCRIBED: 'subscribed',
    REMINDER: 'reminder',
    PENDING_PERMISSION: 'pending_permission',
    MENTION: 'mention',
    SUPERVISOR:  'supervisor',
    PERMISSION: 'permission',
    SYSTEM: 'system',
    UNIVERSAL_MEDICAL_RECORD: 'universal_medical_record',
    EMERGENCY_DATA: 'emergency_data',
    DIRECT_MESSAGE: 'direct_message',
    TRANSCRIPTION: 'transcription',
    REFERRAL_REQUEST: 'referral_request',
    REFERRAL_RESPONSE: 'referral_response',
    P2P_COMMUNICATION: 'p2p_communication',
    LAB: 'lab',
    DIAGNOSTICS: 'diagnostics',
    INVITE_RECEIVED: 'invite_received',
    INVITE_SENT: 'invite_sent',
}

export const AggregationTypeListByRole = {
    provider: [AggregationType.DRAFT, AggregationType.URGENT,
        AggregationType.PRIORITY, AggregationType.MENTION, AggregationType.DIRECT_MESSAGE, AggregationType.FOLLOWED,
        AggregationType.TRANSCRIPTION, AggregationType.SUBSCRIPTION,
        AggregationType.SUBSCRIBED, AggregationType.REMINDER, AggregationType.PENDING_PERMISSION,
        AggregationType.REFERRAL_REQUEST, AggregationType.REFERRAL_RESPONSE, AggregationType.P2P_COMMUNICATION,
        AggregationType.LAB, AggregationType.DIAGNOSTICS, AggregationType.INVITE_RECEIVED,
        AggregationType.INVITE_SENT],
    patient: [AggregationType.DRAFT, AggregationType.URGENT,  AggregationType.PRIORITY,
        AggregationType.FOLLOWED, AggregationType.MENTION, AggregationType.DIRECT_MESSAGE,
        AggregationType.PERMISSION, AggregationType.SYSTEM,
        AggregationType.EMERGENCY_DATA, AggregationType.UNIVERSAL_MEDICAL_RECORD],
    scribe: [AggregationType.DRAFT, AggregationType.URGENT, AggregationType.MENTION, AggregationType.DIRECT_MESSAGE,
        AggregationType.FOLLOWED, AggregationType.REMINDER, AggregationType.SUPERVISOR],
    staff: [AggregationType.DRAFT, AggregationType.URGENT,
        AggregationType.PRIORITY, AggregationType.MENTION, AggregationType.DIRECT_MESSAGE, AggregationType.FOLLOWED,
        AggregationType.TRANSCRIPTION, AggregationType.SUBSCRIPTION,
        AggregationType.SUBSCRIBED, AggregationType.REMINDER, AggregationType.PENDING_PERMISSION,
        AggregationType.REFERRAL_REQUEST, AggregationType.REFERRAL_RESPONSE, AggregationType.P2P_COMMUNICATION,
        AggregationType.LAB, AggregationType.DIAGNOSTICS, AggregationType.INVITE_RECEIVED,
        AggregationType.INVITE_SENT],
    assistant: [AggregationType.DRAFT, AggregationType.URGENT, AggregationType.PRIORITY, AggregationType.FOLLOWED, AggregationType.REMINDER],
}
export const AggregationInit = {
    draft: { id: 1, title: 'Drafts', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    urgent: { id: 2, title: 'Urgent Messages', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    priority: { id: 3, title: 'Priority Messages', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    followed: { id: 4, title: 'Followed', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    mention: { id: 5, title: 'Mentions', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    subscription: { id: 6, title: 'Subscription requests', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    subscribed: { id: 7, title: 'Subscribed', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    reminder: { id: 8, title: 'Reminders', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    reply: { id: 9, title: 'Threaded discussion', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    pending_permission: { id: 10, title: 'Pending permissions', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    supervisor: { id: 11, title: 'Supervisor', notification: 0, urgent: 0, priority: 0, followed: 0, hasIcon: false },
    permission: { id: 12, title: 'Permissions', notification: 0, urgent: 0, priority: 0, followed: 0, hasIcon: false },
    system: { id: 13, title: 'System', notification: 0, hasIcon: false },
    universal_medical_record: { id: 14, title: 'Universal medical record', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    emergency_data:  { id: 15, title: 'Emergency data', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    direct_message: { id: 16, title: 'Direct messages', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    transcription: { id: 17, title: 'Transcriptions', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: true },
    referral_request: { id: 18, title: 'Referrals requests', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    referral_response: { id: 19, title: 'Referrals response', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    p2p_communication: { id: 20, title: 'Providers - patient communications', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    lab: { id: 21, title: 'Labs', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    diagnostics: { id: 22, title: 'Diagnostics', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    invite_received: { id: 23, title: 'Invite received', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false },
    invite_sent: { id: 24, title: 'Invite sent', urgent: 0, priority: 0, followed: 0, notification: 0, hasIcon: false }

}

export const MessageEventType = {
    NONE: 1,
    REPLY: 2,
    EDIT: 3,
    DELETE: 4,
    COPY: 5,
    FORWARD: 6,
    MOVE: 7,
    REMINDER: 8,
    AUDIO_RECORD: 9,
    SHOW_CLIP: 10,
    SPEECH_TO_TEXT: 11,
}

export const MessageType = {
    NORMAL: 1,
    REPLY: 2,
    EDIT: 3,
    DELETE: 4,
    COPY: 5,
}

export const MenuCategory = {
    NONE: 0,
    ROOM: 1,
    APPOINTMENT: 2,
    SCRIBE: 3,
    ASSISTANT: 4,
    PROVIDER_TO_PATIENT: 5,
    PATIENT_TO_PROVIDER: 6,
    SCRIBE_TO_PROVIDER: 7,
    NONE_PATIENT: 8,
    STAFF_TO_PATIENT: 9,
    STAFF_TO_PROVIDER: 10,
    PROVIDER_FOR_ASSISTANT: 11,
    PATIENT_FOR_ASSISTANT: 12,
    SHOW_MESSAGE_OF_ROOM: 13,
    AGGREGATE_MESSAGE: 14,
}

export const PerPageCount = {
    MESSAGE: 10
}

export const ALARM_MESSAGE_COPY_ROOMS = 'Select from rooms to paste message'

export const SubRooms = [
    { id: 1, name: 'Emergency data', type: 1 },
    { id: 2, name: 'Universal Medical Record', type: 1 },
    { id: 3, name: 'Scribe', type: 2 },
    { id: 4, name: 'Manager / supervisor', type: 2},
    { id: 5, name: 'Staff', type: 2},
    { id: 6, name: 'Assistant', type: 2},
]
export const SubRoomsRoute = [
    'Cameron',
    'Provider 2',
    'Cameron',
    'Cameron',
    'Cameron',
]
export const ROOMS = [
    'Scribe',
    'Staff A',
    'Staff B',
    'Staff C',
    'Manager / supervisor',
    'Admin',
    'Providers - non-patient communications ',
    'Business',
    'Professional',
    'Meetings',
    'Other',
    'System',
]

export const ColorTheme = {
    WHITE: 1,
    LIGHT_BLUE: 2,
    PINK: 3,
    DARK: 4
}

export const ViewMode = {
    NORMAL: 1,
    FULL: 2
}


// ================================================================
export const appointment = [
    { id: 1, name: 'Todays Appointments' },
    { id: 2, name: 'Recent Appointments' },
    { id: 3, name: '+/- 1 Week Appointments' },
]

export const nonPatients = [
    { type: 'nonPatiant', name: 'Private', notification: 1234, urgent: 210, priority: 123, followed: 120},
    { type: 'nonPatiant',name: 'Public', notification: 1234,},
]

export const dependents = [
    { name: 'Bill Singh', notification: 1234, urgent: 210, priority: 123, followed: 120},
    { name: 'Huang Hai Long', notification: 1234, urgent: 210, priority: 123, followed: 120},
    { name: 'Siman', notification: 1234, urgent: 210, priority: 123, followed: 120},
    { name: 'Planker', notification: 1234, urgent: 210, priority: 123, followed: 120},
]

export const assistant = [
    { id: 1, name: 'Scribe' },
    { id: 2, name: 'Assistant' }
]

export const HealthcarePartners = [
    { id: 1, name: 'Payer 1'},
    { id: 2, name: 'Payer 2'},
    { id: 3, name: 'Lawyer 1'},
    { id: 4, name: 'Govt.agency 1'}
]

export const createStreamFields = [
    { refName: "ref1", placeHolder: "Input stream name" },
    { refName: "ref2", placeHolder: "Input description" }
]

export const ALARM_MESSAGE_COPY_USERS = 'Select from users to paste message'
export const ALARM_MESSAGE_COPY_MESSAGE = 'Select from the rooms below'

export const users = [
    {
        name: 'Bill Singh',
        isOnline: true,
    },
    {
        name: 'Huang Hai Long',
        isOnline: false,
    },
    {
        name: 'Siman',
        isOnline: false,
    },
    {
        name: 'Planker',
        isOnline: true,
    },
    {
        name: 'Tim Abett',
        isOnline: false,
    },
    {
        name: 'BWinkler',
        isOnline: true,
    },
    {
        name: 'John',
        isOnline: true,
    },
    {
        name: 'Albert',
        isOnline: true,
    },
]
export const rooms = [
    'Admin',
    'Staff',
    'Providers - non-patient communications ',
    'Referrals requests',
    'Referrals responses',
    'Providers - patient communications',
    'Labs',
    'Diagnostics',
    'Business',
    'Professional',
    '@Mentions',
    'Other',
    'System',
    'Invites received',
    'Invites sent',
]


