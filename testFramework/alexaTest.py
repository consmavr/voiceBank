#!/usr/bin/python2
# -*- coding: utf-8 -*-

import os
import sys
import json
import traceback
from tests_list import basic_utils_list
from card_info_list import cardInfo
from account_info_list import accountInfo
from tests_order import order

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

SKILL_ID = os.environ.get("SKILLID")

def merge_dicts(x, y, *arg):
    z = x.copy()   # start with x's keys and values
    z.update(y)    # modifies z with y's keys and values & returns None
    if len(arg) > 0:
        for _y in arg:
            z.update(_y)
    return z

def test_file(file, speech_input, status='SUCCESSFUL', response_type=None, intent=None, ssml=None, delegate=None, slots=None, slot_values=None, shouldEndSession=None):
    testResult = './tests/results/' + file + '_results' + '.txt'
    # Execute ask simulate from cmd
    try:
        os.system('ask simulate -s ' + SKILL_ID + ' -l en-US -t "' +
                  speech_input + '" > ' + testResult)
    except:
        sys.exit('File could not be opened. Exiting...')

    # Process results
    with open(testResult) as f:
        data = json.load(f)

        try:
            # STATUS
            if(status):
                assert data['status'] == status
                # print "...STATUS CHECK PASSED"

            # RESPONSE TYPE
            if(response_type):
                assert data['result']['skillExecutionInfo']['invocationRequest']['body']['request']['type'] == response_type
            # print "...RESPONSE TYPE CHECK PASSED"

            # IS DELEGATING
            if(delegate):
                assert data['result']['skillExecutionInfo']['invocationResponse'][
                    'body']['response']['directives']['type'] == 'Dialog.Delegate'

            # SLOTS
            if(slots):
                assert data['result']['skillExecutionInfo']['invocationRequest']['body']['request']['intent']['slots']
                assert len(slots) == len(slot_values)
                for i in range(0, len(slots)):
                    assert data['result']['skillExecutionInfo']['invocationRequest']['body'][
                        'request']['intent']['slots'][slots[i]]['value'] == slot_values[i]

            # SESSION END
            assert data['result']['skillExecutionInfo']['invocationResponse']['body']['response']['shouldEndSession'] == shouldEndSession
            # print "...END SESSION CHECK PASSED"

            try:
                speech_output = data['result']['skillExecutionInfo']['invocationResponse']['body']['response']['outputSpeech']['ssml']
            except:
                speech_output = "-"
            
            print("\nInput: \x1b[1;35;40m%s\x1b[0m \nOutput: \x1b[1;36;40m%s\x1b[0m") % (
                speech_input, speech_output)
            print('\x1b[6;30;42m' + 'Test Passed!' + '\x1b[0m \n')

        except AssertionError as e:
            print('\n\x1b[1;37;41m' + 'Assertion Error' + '\x1b[0m')
            _, _, tb = sys.exc_info()
            traceback.print_tb(tb)  # Fixed format
            tb_info = traceback.extract_tb(tb)
            filename, line, func, text = tb_info[-1]

            print('An error occurred on line {} in statement {}'.format(line, text))
            end = raw_input("Press enter to close...")
            sys.exit()

# merge lits
files = merge_dicts(basic_utils_list, cardInfo, accountInfo)

# Needed to enable colors
os.system("echo Starting...")

for key in order:
    print('\x1b[1;33;40m' + key + '\x1b[0m')

    try:
        _intent = files[key]['intent']
    except:
        _intent = None
    test_file(key,
              speech_input=files[key]['speech_input'],
              response_type=files[key]['response_type'],
              shouldEndSession=files[key]['shouldEndSession'],
              intent=_intent,
              slots=files[key]['slots'],
              slot_values=files[key]['slots_values']
              )

end = raw_input("Press enter to close...")
