#!/usr/local/bin/ruby
require 'webrick'

module WEBrick::HTTPServlet
  FileHandler.add_handler('rb', CGIHandler)
end

def webrick(config = {})
  WEBrick::HTTPServer.new(config).instance_eval do |server|
    [:INT, :TERM].each do |signal|
      Signal.trap(signal) {
        shutdown
      }
    end
    start
  end
end

doc_root = Dir.pwd
webrick :DocumentRoot => doc_root,
        :CGIInterpreter => WEBrick::HTTPServlet::CGIHandler::Ruby,
        :Port => 8080
