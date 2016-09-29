describe "Poker game api" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @url = "http://localhost:3000/api/users"
    @cards_url = "http://localhost:3000/api/games/test/winner"
    @username = "test1"
    @password = "password"
  end

  it 'should allow a user to be created' do
    create_user = HTTParty.post(@url, body:{ username: "#{@username}", password: "#{@password}", wallet: "#{@wallet}"})
    create_user.code
    expect(create_user.code).to eq 201
    create_user.message
    expect(create_user.message).to eq "Created"
  end

  it 'should allow a user to log in' do
    login = HTTParty.post("http://localhost:3000/api/users/login", body:{ username: "#{@username}", password: "#{@password}"})
    login.code
    expect(login.code).to eq 200
    login.message
    expect(login.message).to eq "OK"
  end

  it 'should return a royal flush and player 0 as the winner' do
    cards = HTTParty.post("@cards_url",
      body:{
        "playerHands": {
          "player0": [ {"suit": "heart", "value": 10}, {"suit": "heart", "value": 11} ],
          "player1": [ {"suit": "diamond", "value": 2}, {"suit": "diamond", "value": 3} ],
          "player2": [ {"suit": "diamond", "value": 4}, {"suit": "diamond", "value": 5} ],
          "player3": [ {"suit": "diamond", "value": 6}, {"suit": "diamond", "value": 7} ],
          "player4": [ {"suit": "diamond", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 12},
            {"suit": "heart", "value": 13},
            {"suit": "heart", "value": 14},
            {"suit": "spade", "value": 7},
            {"suit": "club", "value": 9}
        ]
      }
    )
    expect(response[8]).to_not eq nil 
    # use a HTTParty.get(url/checkwinner)
    # pass in 7 cards
    # check 7 cards are a royal flush - pass
    # check 7 cards ARE NOT a royal flush
  end

end
