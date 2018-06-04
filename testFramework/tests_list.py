basic_utils_list = {
    "launch":
    {
        "speech_input": "open voice bank",
        "delegate": None,
        "response_type": "LaunchRequest",
        "intent": None,
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
    "bye":
    {
        "speech_input": "bye",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "AMAZON.StopIntent",
        "shouldEndSession": True,
        "slots": None,
        "slots_values": None
    },
    "cancel":
    {
        "speech_input": "cancel",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "AMAZON.CancelIntent",
        "shouldEndSession": True,
        "slots": None,
        "slots_values": None
    },
    "resetUsername":
    {
        "speech_input": "how to reset my username",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "howResetUsername",
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
}
