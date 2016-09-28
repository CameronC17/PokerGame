describe "Poker game api" do 

  before:all do 
    @driver = Selenium::WebDriver.for :chrome
    @url = "http://localhost:3000/api/users"
    @username = "test1"
    @password = "password"
    @wallet = "100"
  end

  it "should allow a user to be created" do 
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

end