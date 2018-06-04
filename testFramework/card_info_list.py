cardInfo = {
    "launchCardNone":
    {
        "speech_input": "ask voice bank if i can use my card abroad",
        "delegate": None,
        "response_type": "LaunchRequest",
        "intent": None,
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
    "launchCardDebit":
    {
        "speech_input": "ask voice bank if i can use my debit card abroad",
        "delegate": None,
        "response_type": "LaunchRequest",
        "intent": None,
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["debit"]
    },
    "launchCardCredit":
    {
        "speech_input": "ask voice bank if i can use my credit card abroad",
        "delegate": None,
        "response_type": "LaunchRequest",
        "intent": None,
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["credit"]
    },
    "cardNone":
    {
        "speech_input": "Can i use my card abroad",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": None,
        "slots_values": None
    },
    "cardDebit":
    {
        "speech_input": "Can i use my debit card abroad",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ['cardType'],
        "slots_values": ['debit']
    },
    "cardCredit":
    {
        "speech_input": "Can i use my credit card abroad",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ['cardType'],
        "slots_values": ['credit']
    },
    "cardNoneDebit1":
    {
        "speech_input": "debit card",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["debit"]
    },
    "cardNoneDebit2":
    {
        "speech_input": "debit",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["debit"]
    },
     "cardNoneCredit1":
    {
        "speech_input": "credit card",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["credit"]
    },
    "cardNoneCredit2":
    {
        "speech_input": "credit",
        "delegate": None,
        "response_type": "IntentRequest",
        "intent": "cardInfoAbroad",
        "shouldEndSession": False,
        "slots": ["cardType"],
        "slots_values": ["credit"]
    },
}