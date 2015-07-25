require 'fileutils'
include FileUtils

BIN_DIR = "#{__dir__}/node_modules/.bin".freeze

def cmd_exists?(cmd)
  File.exists?(cmd) && File.executable?(cmd)
end

def ensure_cmd(cmd)
  paths = ENV['PATH'].split(':').uniq

  found = paths.find {|p| cmd_exists? "#{p}/#{cmd}" }
  return "#{found}/#{cmd}" if found

  return "#{BIN_DIR}/#{cmd}" if cmd_exists?"#{BIN_DIR}/#{cmd}"

  raise "'#{cmd}' command doesn't exist"
end

task :dep do
  sh 'npm install --dev'
end

task :slimrb do
  slimrb = ensure_cmd 'slimrb'
  mkdir_p 'build/static'

  Dir['static/*.slim'].each do |slim_file|
    sh slimrb, slim_file, "build/static/#{File.basename(slim_file, '.slim')}.html"
  end
end

task :tsd do
  tsd = ensure_cmd 'tsd'
  sh tsd, 'install'
end

task :tsc do
  tsc = ensure_cmd 'tsc'

  sh "#{tsc} -p browser"
  sh "#{tsc} renderer/*.ts --out build/renderer/index.js"
end

task :build => %i(slimrb tsd tsc)

task :npm_publish => %i(build) do
  mkdir 'npm-publish'
  %w(package.json build bin README.md).each{|p| cp_r p, 'npm-publish' }
  cd 'npm-publish' do
    sh 'npm install --save electron-prebuilt'
    sh 'npm publish'
  end
  rm_rf 'npm-publish'
end

task :asar => %i(build) do
  asar = ensure_cmd 'asar'

  mkdir_p 'archive'
  begin
    %w(package.json build).each{|p| cp_r p, 'archive' }
    cd 'archive' do
      sh 'npm install --production'
    end
    sh "#{asar} pack archive app.asar"
  ensure
    rm_rf 'archive'
  end
end
task :run => %i(build) do
  sh "#{__dir__}/bin/cli.js"
end

task :clean do
  %w(npm-publish build archive).each{|tmpdir| rm_rf tmpdir}
end

