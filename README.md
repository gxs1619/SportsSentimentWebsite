# Welcome
    This repo hosts the website code needed to run the front end of our 
    sports sentiment predictor project. 

# Features
    Specify two teams, a city that is hosting the game, the date of the game, and the
    type of sport the teams are both playing. (We dont have much input checking, so
    please make sure its correct otherwise the output will be bad)

    Two cards at the bottom that show the general sentiment, and the confidence
    of the sentiment.


# Request data
    The format of the incoming data for comprehend results MUST be in the following format
            ```json
                {
                   "t1Confidence" : "",
                   "t2Confidence" : "",
                   "t1Result" : "",
                   "t2Result" : "",
                   "totalTweets" : "",
                }
            ```