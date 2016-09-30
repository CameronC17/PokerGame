describe "Poker game api" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @fe_base_ip = ENV['POKER_GAME_FRONTEND_BASE_IP'] || "localhost:3001"
    @api_base_ip = ENV['POKER_GAME_API_BASE_IP'] || "localhost:3000"

    @fe_url = "http://#{@fe_base_ip}"
    @api_url = "http://#{@api_base_ip}/api"

    @url = "#{@api_url}/users"
    @cards_url = "#{@api_url}/games/test/winner"
    @deck_url = "#{@api_url}/games"
    @username = "test" + rand(1000).to_s
    @password = "password"
    @id = "57ea4d5851eecd3b9b42e8e9"
  end

  it 'should allow a user to be created' do
    create_user = HTTParty.post(@url, body:{ username: "#{@username}", password: "#{@password}", wallet: "#{@wallet}"})
    expect(create_user.code).to eq 201
    expect(create_user.message).to eq "Created"
  end

  it 'should allow a user to log in' do
    login = HTTParty.post("#{@url}/login", body:{ username: "#{@username}", password: "#{@password}"})
    expect(login.code).to eq 200
    expect(login.message).to eq "OK"
  end
  it 'should allow a user to edit their username/password' do
    edit_username = HTTParty.patch("#{@url}/#{@id}", body:{ username: "alex_test"})
    expect(edit_username.code).to eq 200
    expect(edit_username.message).to eq "OK"
    edit_password = HTTParty.patch("#{@url}/#{@id}", body:{ passowrd: "password2000"})
    expect(edit_password.code).to eq 200
    expect(edit_password.message).to eq "OK"
    edit_both = HTTParty.patch("#{@url}/#{@id}", body:{ username: "testz", passowrd: "password"})
    expect(edit_both.code).to eq 200
    expect(edit_both.message).to eq "OK"
  end

  it 'should check that the deck that has been dealt is shuffled' do
    @driver.get(@fe_url)
    run_game
    deck = HTTParty.post("#{@deck_url}/0/test", body:{ test: "deck" })
    @driver.get(@fe_url)
    run_game
    deck2 = HTTParty.post("#{@deck_url}/1/test", body:{ test: "deck" })
    expect(deck).to_not eq deck2
    @driver.quit
  end

  it 'should return a royal flush and player 0 as the winner' do
    royalflush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][9]).to_not eq nil
  end

  it 'should return a straight flush and player 0 as the winner' do
    straightflush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][8]).to_not eq nil
  end

  it 'should return a four of a kind and player 0 as the winner' do
    fourkind
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][7]).to_not eq nil
  end

  it 'should return a full house and player 0 as the winner' do
    fullhouse
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][6]).to_not eq nil
  end

  it 'should return a flush and player 0 as the winner' do
    flush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][5]).to_not eq nil
  end

  it 'should return a straight and player 0 as the winner' do
    straight
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][4]).to_not eq nil
  end

  it 'should return a three of a kind and player 0 as the winner' do
    threekind
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][3]).to_not eq nil
  end

  it 'should return a two pair and player 0 as the winner' do
    twopair
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][2]).to_not eq nil
  end

  it 'should return a pair and player 0 as the winner' do
    pair
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][1]).to_not eq nil
  end

  it 'should return a high card and player 0 as the winner' do
    highcard
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][0]).to_not eq nil
  end

end
