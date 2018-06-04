files = {
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
    "debit1":
    {
        "speech_input": "Can i use my card abroad",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
    "debit2":
    {
        "speech_input": "debit card",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["debit"]
    },
    "account_info":
    {
        "speech_input": "credit balance",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "accountInfo",
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
    "reset_username":
    {
        "speech_input": "how to reset my username",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "howResetUsername",
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
    }
}
