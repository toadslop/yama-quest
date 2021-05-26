I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), JSON.parse('{"activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"has_many":"Cannot delete record because dependent %{record} exist","has_one":"Cannot delete record because a dependent %{record} exists"}}}},"attributes":{"altitude":"Altitude","effort":"Physical difficulty","length":"Trip length","terrain":"Terrain defficulty"},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid %{authentication_keys} or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid %{authentication_keys} or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"email_changed":{"subject":"Email Changed"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \\"%{reason}\\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can\'t access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirmation link to confirm your new email address.","updated":"Your account has been updated successfully.","updated_but_not_signed_in":"Your account has been updated successfully, but since your password was changed, you need to sign in again"},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"errors":{"connection_refused":"Oops! Failed to connect to the Web Console middleware.\\nPlease make sure a rails development server is running.\\n","format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can\'t be blank","confirmation":"doesn\'t match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","empty":"can\'t be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","model_invalid":"Validation failed: %{errors}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","required":"must exist","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"unacceptable_request":"A supported version is expected in the Accept header.\\n","unavailable_session":"Session %{id} is no longer available in memory.\\n\\nIf you happen to run on a multi-process server (like Unicorn or Puma) the process\\nthis request hit doesn\'t store %{id} in memory. Consider turning the number of\\nprocesses/workers to one (1) or using a different server in development.\\n"},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"hello":"Hello world","helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"landing":{"enter":"Enter","text1":"Mountains make up 73% of Japan. If you don\'t go see them, aren\'t you missing out?","text2":"Discover their beauty and majesty in Yama Quest..."},"left-sidebar":{"area":"Area"},"lengths":{"1泊2日":"2 days","2泊3日":"3 days","3泊4日":"4 days","前夜泊1日":"overnighter","前夜泊日帰り":"overnighter","日帰り":"day trip"},"lists":{"百名山":"100 Famous Mountains"},"mountains":{"トムラウシ山":"Mt. Tomuraushi","両神山":"Mt. Rōgami","丹沢":"Tanzawa","乗鞍岳":"Mt. Norikura","九重山":"Mt. Kujū","五竜岳":"Mt. Goryu","仙丈ヶ岳":"Mt. Senjō","伊吹山":"Mt. Ibuki","会津駒ヶ岳":"Mt. Aizu Komagatake","光岳":"Mt. Tekari","八ヶ岳":"Yatsu-ga-Take","八幡平":"Hachimantai","八甲田山":"Mt. Hakkoda","利尻岳":"Mt. Rishiri","剣山":"Mt. Tsurugi","剱岳":"Mt. Tsurugi","北岳":"Mt. Kita","十勝岳":"Mt. Tokachi","吾妻山":"Mt. Azuma","四阿山":"Mt. Azumaya","塩見岳":"Mt. Shiomi","大台ヶ原山":"Mt. Ōdai-ga-Hara","大山":"Mt. Daisen","大峰山":"Mt. Ōmine","大菩薩嶺":"Mt. Daibosatsu","大雪山":"Mt. Daisetsu","天城山":"Mt. Amagi","妙高山":"Mt. Myōkō","安達太良山":"Mt. Adatara","宮之浦岳":"Mt. Miyanoura","富士山":"Mt. Fuji","岩手山":"Mt. Iwate","岩木山":"Mt. Iwaki","巻機山":"Mt. Makihata","常念岳":"Mt. Jōnen","幌尻岳":"Mt. Poroshiri","平ヶ岳":"Mt. Hiragatake","後方羊蹄山":"Mt. Yōtei","御嶽山":"Mt. Ontake","恵那山":"Mt. Ena","悪沢岳":"Mt. Warusawa","斜里岳":"Mt. Shari","日光白根山":"Mt. Nikkō-Shirane","早池峰山":"Mt. Hayachine","月山":"Mt. Gassan","朝日連峰":"Mt. Asahi","木曽駒ヶ岳":"Mt. Kisokoma","槍ヶ岳":"Mt. Yari","武尊山":"Mt. Hotake","水晶岳":"Mt. Suishō","浅間山":"Mt. Asama","火打山":"Mt. Hiuchi","焼岳":"Mt. Yake","燧ヶ岳":"Hiuchi-ga-Take","瑞牆山":"Mt. Mizugaki","甲斐駒ヶ岳":"Mt. Kaikoma","甲武信岳":"Mt. Kobushi","男体山":"Mt. Nantai","白山":"Mt. Haku","白馬岳":"Mt. Shirouma","皇海山":"Mt. Sukai","石鎚山":"Mt. Ishizuchi","磐梯山":"Mt. Bandai","祖母山":"Mt. Sobo","穂高岳":"Mt. Hotaka","空木岳":"Mt. Utsugi","立山":"Tateyama","笠ヶ岳":"Kasagatake","筑波山":"Mt. Tsukuba","羅臼岳":"Mt. Rausu","美ヶ原":"Utsukushi-ga-Hara","聖岳":"Mt. Hijiri","至仏山":"Mt. Shibutsu","苗場山":"Mt. Naeba","草津白根山":"Mt. Kusatsu-Shirane","荒島岳":"Mt. Arashima","蓼科山":"Mt. Tateshina","蔵王山":"Mt. Zaō","薬師岳":"Mt. Yakushi","谷川岳":"Mt. Tanigawa","赤城山":"Mt. Akagi","赤石岳":"Mt. Akaishi","越後駒ヶ岳":"Mt. Echigo Komagatake","那須岳":"Mt. Nasu","金峰山":"Mt. Kinpu","開聞岳":"Kaimondake","間ノ岳":"Mt. Aino","阿寒岳":"Mt. Akan","阿蘇山":"Mt. Aso","雨飾山":"Mt. Amakazari","雲取山":"Mt. Kumotori","霧ヶ峰":"Mt. Kirigame","霧島山":"Mt. Kirishima","飯豊連峰":"Mt. Iide","高妻山":"Mt. Takatsuma","鳥海山":"Mt. Chōkai","鳳凰山":"Mt. Hōō","鷲羽岳":"Mt. Washiba","鹿島槍ヶ岳":"Kashimayari-ga-Take","黒部五郎岳":"Mt. Kurobegorō"},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"round_mode":"default","separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"eb":"EB","gb":"GB","kb":"KB","mb":"MB","pb":"PB","tb":"TB"}}},"nth":{"ordinalized":{},"ordinals":{}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"regions":{"上信越":"Joshin-etsu","上州":"Joshu","中国":"Chukoku","中央アルプス":"Central Alps","九州":"Kyushu","八ヶ岳":"Yatsu-ga-Take","北アルプス":"Northern Alps","北海道":"Hokkaido","北関東":"North Kanto","北陸":"Hokuriku","南アルプス":"Southern Alps","南関東":"South Kanto","四国":"Shikoku","奥秩父":"Oku-Chichibu","尾瀬":"Oze","御嶽山":"Mt. Ontake","日光":"Nikko","東北":"Tohoku","秩父":"Chichibu","美ヶ原":"Utsukushi-ga-Hara","蓼科山":"Mt. Tateshina","足尾":"Ashio","近畿":"Kinki","霧ヶ峰":"Kiri-ga-Mine"},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"yama-quest":"Yama Quest"}'));
I18n.translations["jp"] = I18n.extend((I18n.translations["jp"] || {}), JSON.parse('{"attributes":{"altitude":"標高","effort":"体力度","length":"参考日程","terrain":"難易度"},"landing":{"enter":"入る","text1":"日本の74％は山からなっている。行ってみなければ何かを逃しているんじゃない？","text2":"艶美と尊厳を探ろう"},"left-sidebar":{"area":"エリア"},"lengths":{"1泊2日":"1泊2日","2泊3日":"2泊3日","3泊4日":"3泊4日","前夜泊1日":"前夜泊1日","前夜泊日帰り":"前夜泊日帰り","日帰り":"日帰り"},"lists":{"百名山":"百名山"},"mountains":{"トムラウシ山":"トムラウシ山","両神山":"両神山","丹沢":"丹沢","乗鞍岳":"乗鞍岳","九重山":"九重山","五竜岳":"五竜岳","仙丈ヶ岳":"仙丈ヶ岳","伊吹山":"伊吹山","会津駒ヶ岳":"会津駒ヶ岳","光岳":"光岳","八ヶ岳":"八ヶ岳","八幡平":"八幡平","八甲田山":"八甲田山","利尻岳":"利尻岳","剣山":"剣山","剱岳":"剱岳","北岳":"北岳","十勝岳":"十勝岳","吾妻山":"吾妻山","四阿山":"四阿山","塩見岳":"塩見岳","大台ヶ原山":"大台ヶ原山","大山":"大山","大峰山":"大峰山","大菩薩嶺":"大菩薩嶺","大雪山":"大雪山","天城山":"天城山","妙高山":"妙高山","安達太良山":"安達太良山","宮之浦岳":"宮之浦岳","富士山":"富士山","岩手山":"岩手山","岩木山":"岩木山","巻機山":"巻機山","常念岳":"常念岳","幌尻岳":"幌尻岳","平ヶ岳":"平ヶ岳","後方羊蹄山":"後方羊蹄山","御嶽山":"御嶽山","恵那山":"恵那山","悪沢岳":"悪沢岳","斜里岳":"斜里岳","日光白根山":"日光白根山","早池峰山":"早池峰山","月山":"月山","朝日連峰":"朝日連峰","木曽駒ヶ岳":"木曽駒ヶ岳","槍ヶ岳":"槍ヶ岳","武尊山":"武尊山","水晶岳":"水晶岳","浅間山":"浅間山","火打山":"火打山","焼岳":"焼岳","燧ヶ岳":"燧ヶ岳","瑞牆山":"瑞牆山","甲斐駒ヶ岳":"甲斐駒ヶ岳","甲武信岳":"甲武信岳","男体山":"男体山","白山":"白山","白馬岳":"白馬岳","皇海山":"皇海山","石鎚山":"石鎚山","磐梯山":"磐梯山","祖母山":"祖母山","穂高岳":"穂高岳","空木岳":"空木岳","立山":"立山","笠ヶ岳":"笠ヶ岳","筑波山":"筑波山","羅臼岳":"羅臼岳","美ヶ原":"美ヶ原","聖岳":"聖岳","至仏山":"至仏山","苗場山":"苗場山","草津白根山":"草津白根山","荒島岳":"荒島岳","蓼科山":"蓼科山","蔵王山":"蔵王山","薬師岳":"薬師岳","谷川岳":"谷川岳","赤城山":"赤城山","赤石岳":"赤石岳","越後駒ヶ岳":"越後駒ヶ岳","那須岳":"那須岳","金峰山":"金峰山","開聞岳":"開聞岳","間ノ岳":"間ノ岳","阿寒岳":"阿寒岳","阿蘇山":"阿蘇山","雨飾山":"雨飾山","雲取山":"雲取山","霧ヶ峰":"霧ヶ峰","霧島山":"霧島山","飯豊連峰":"飯豊連峰","高妻山":"高妻山","鳥海山":"鳥海山","鳳凰山":"鳳凰山","鷲羽岳":"鷲羽岳","鹿島槍ヶ岳":"鹿島槍ヶ岳","黒部五郎岳":"黒部五郎岳"},"regions":{"上信越":"上信越","上州":"上州","中国":"中国","中央アルプス":"中央アルプス","九州":"九州","八ヶ岳":"八ヶ岳","北アルプス":"北アルプス","北海道":"北海道","北関東":"北関東","北陸":"北陸","南アルプス":"南アルプス","南関東":"南関東","四国":"四国","奥秩父":"奥秩父","尾瀬":"尾瀬","御嶽山":"御嶽山","日光":"日光","東北":"東北","秩父":"秩父","美ヶ原":"美ヶ原","蓼科山":"蓼科山","足尾":"足尾","近畿":"近畿","霧ヶ峰":"霧ヶ峰"},"yama-quest":"山クエスト"}'));
