class HelloController < ApplicationController
	after_filter :set_access_control_headers

	def set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Request-Method'] = '*'
	end

	def index
		getresult = open('http://board.archeage.com/free/taglist/@%ED%82%A4%ED%94%84%EB%A1%9C%EC%82%AC').read
		doc = Nokogiri::XML(getresult)
		@my_data = doc.css('div.tag_issue')
		puts '============================='
		puts @my_data
	end

end
