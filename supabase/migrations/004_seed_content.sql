-- Seed realistic Glitches and Debates
-- Designed to look like genuine human submissions

-- ═══════════════════════════════════════
-- GLITCHES (30 entries across categories)
-- ═══════════════════════════════════════

insert into public.glitches (title, description, category, upvotes, anon_handle, archetype_id, created_at) values

-- SYNCHRONICITY
('Three strangers said the same phrase in one day', 'Different cities, different ages, completely unrelated contexts. Someone at the coffee shop, my landlord, then a guy on the train all said "you can''t outrun the timing" within a few hours. I don''t even know what it means but I haven''t been able to think about anything else.', 'SYNCHRONICITY', 247, 'sector_7', 'awakened-npc', now() - interval '2 hours'),

('Got a call from my brother the second I started spiraling', 'Was about to do something stupid with my savings, phone rang exactly when I was about to click. He had no reason to call. He just said "what are you doing right now" and I had to tell him.', 'SYNCHRONICITY', 412, 'embedded.kid', 'pattern-seeker', now() - interval '5 hours'),

('Every taxi driver I''ve had this month was named David', 'Five different cities. Different countries actually. I started asking and they all said David. I don''t know how to explain this. The simulation is using a placeholder name and didn''t bother varying it for me.', 'SYNCHRONICITY', 156, 'rendered_gently', 'glitch-watcher', now() - interval '1 day'),

('Thinking of a song made it play in the cafe 90 seconds later', 'Specific obscure song. Hadn''t heard it in years. Was wondering whatever happened to the band. Walked into a cafe I''ve never been to. It was playing.', 'SYNCHRONICITY', 89, 'lowfi_anomaly', null, now() - interval '2 days'),

('Met someone with my exact birth time', 'Same day, same year, same city, same hour. Casual conversation at a bar. We didn''t even compare anything else, just walked away looking at each other weird.', 'SYNCHRONICITY', 203, 'twin_render', 'pattern-seeker', now() - interval '3 days'),

('Saw 11:11 every single day for two months', 'Every day. Even on days I forgot. I''d look up randomly and there it was. Then it stopped completely the day I started actually paying attention to my life.', 'SYNCHRONICITY', 524, 'awake_now', 'awakened-npc', now() - interval '4 days'),

-- DÉJÀ VU
('Lived a 5 minute conversation I had already lived', 'Down to the exact words, the exact pauses, the exact way light hit the table. I knew what she was going to say before she said it. I tried to deviate from the script and couldn''t. The simulation just played the cached version.', 'DÉJÀ VU', 387, 'cache_aware', 'pattern-seeker', now() - interval '6 hours'),

('The dream told me what would happen at work', 'Specific email, specific reaction from my boss, specific time. Watched it unfold the next day exactly as the dream went. I was just sitting there going "ok, this is what we''re doing now."', 'DÉJÀ VU', 178, 'subroutine_44', 'glitch-watcher', now() - interval '1 day'),

('Felt déjà vu about feeling déjà vu', 'Recursive. I had the certainty that I had previously had this exact moment of being uncertain. My brain almost folded itself.', 'DÉJÀ VU', 92, 'idle_loop_void', null, now() - interval '4 days'),

-- ANOMALY
('Spent 20 minutes looking at my hand', 'Sat down and looked at my own hand for 20 minutes. The veins, the lines, the way the skin moves over the bones. I couldn''t believe a body had been built around my consciousness this carefully and I''d never actually looked at it. The render is incredible.', 'ANOMALY', 612, 'first_inspection', 'awakened-npc', now() - interval '3 hours'),

('The room felt rendered', 'Just for about 4 seconds. The whole room. Like I could feel that it was being computed. The walls had a quality of being placed there rather than existing. It passed and I was back in standard mode but it happened.', 'ANOMALY', 298, 'render_witness', 'pattern-seeker', now() - interval '2 days'),

('Looked at a crowd and saw NPCs', 'Train station. Probably 200 people. For about 30 seconds I could see the difference between the ones who were really there and the ones who were idle animations. Then it stopped and they all looked the same again. I don''t want to make claims about who is what but the experience itself was specific and clear.', 'ANOMALY', 445, 'platform_9', 'pattern-seeker', now() - interval '3 days'),

('Felt the simulation pause', 'Half a second of complete silence. Birds stopped. Wind stopped. The hum of the city stopped. Then it all came back. I don''t think it was a cardiac event because nothing else happened. It felt like the simulation buffered.', 'ANOMALY', 234, 'buffered', 'awakened-npc', now() - interval '5 days'),

-- DREAM
('Met someone in a dream then met them three weeks later', 'Same face. Same name. Sat down next to me on a bench at a park I had never been to. Started talking like we knew each other. We had a conversation that felt like the second half of one we had started somewhere else.', 'DREAM', 367, 'sleeprunner', 'pattern-seeker', now() - interval '8 hours'),

('Recurring location that doesn''t exist', 'I keep dreaming of the same city. Specific streets. Specific cafe on a corner. I''ve never been there but I know the layout. I''ve started drawing it. If anyone has been there please tell me.', 'DREAM', 189, 'ghost_atlas', null, now() - interval '2 days'),

('Dreamed a phone number, called it, someone answered', 'Wrote it down when I woke up. Stared at it for a day. Called it. Old man picked up. Asked if I knew his daughter. I said I didn''t. He said "ok" and hung up. I haven''t been able to do anything else since.', 'DREAM', 401, 'wrong_recipient', 'glitch-watcher', now() - interval '4 days'),

-- PATTERN
('Every job I''ve had has lasted exactly 18 months', 'Six in a row. Different industries, different cities, voluntary and involuntary departures. Always 18 months. The pattern broke this year because I noticed it.', 'PATTERN', 156, 'cycle_break', 'pattern-seeker', now() - interval '1 day'),

('My ex looked exactly like my high school crush who I never spoke to', 'I didn''t notice for two years of dating. Saw an old yearbook photo. Same face. Different name, different background, different everything else. Same render asset.', 'PATTERN', 278, 'duplicate_NPC', 'glitch-watcher', now() - interval '3 days'),

('Important things in my life always start on the 17th', 'Jobs, relationships, moves, deaths. Checked across 20 years. Vast majority on or within 24 hours of the 17th of some month. Possibly the simulation has cycle markers but only flags the major events.', 'PATTERN', 134, 'seventeen', 'pattern-seeker', now() - interval '5 days'),

('The same homeless man appears in different cities I move to', 'Three cities, two countries. Same exact person. He doesn''t recognize me but he''s there. I asked the second time and he said he had been local his whole life. The third time I just walked past quietly.', 'PATTERN', 298, 'reused_npc_47', 'awakened-npc', now() - interval '6 days'),

-- CONTACT
('A bird stared at me for an entire minute', 'Crow. Outside my window. Didn''t move, didn''t blink. Just stared directly. I stared back. Felt like a check-in. When it left I went and started writing the thing I''d been avoiding for months.', 'CONTACT', 187, 'feathered_observer', 'awakened-npc', now() - interval '12 hours'),

('Felt watched but in a kind way', 'For about a week. Like someone was checking on me. Not creepy at all. The opposite. Then it stopped and I felt mildly sad. I think I passed something.', 'CONTACT', 245, 'witnessed_fine', null, now() - interval '2 days'),

('A stranger told me something only my dead grandmother knew', 'Specific thing. Something I had said to her when I was eight that nobody else was in the room for. Stranger at a bus stop, completely conversational. He had no reason to know it. I didn''t ask him how he knew.', 'CONTACT', 478, 'transmission_received', 'embedded-player', now() - interval '4 days'),

('My cat looked at me with full understanding', 'For maybe two seconds. Eye contact like an adult human would do. I''ve had the cat for 11 years and never seen that face before. Then she went back to being a cat. I''m not crazy.', 'CONTACT', 312, 'house_observer', 'glitch-watcher', now() - interval '7 days'),

-- More mixed for density
('The clock skipped from 3:12 to 3:14 in front of me', 'Digital clock. I was watching it because I was bored on a call. Skipped a minute. Just dropped 3:13 entirely. Probably nothing. But I''ve been thinking about it every day.', 'ANOMALY', 67, 'minute_zero', null, now() - interval '8 days'),

('Walked into a place I''d never been and knew where the bathroom was', 'New restaurant in a city I had only just arrived in. Stood up, walked directly to the bathroom without looking, came back. My friend asked how I knew. I had no answer.', 'PATTERN', 154, 'cached_layout', 'glitch-watcher', now() - interval '9 days'),

('Heard my own name whispered when nobody was there', 'Empty apartment. My voice. From the kitchen. Said my name once. I went and looked. Nothing. Sat back down. About an hour later my mother called for the first time in months. I have no theory. Just logging it.', 'CONTACT', 198, 'self_paged', null, now() - interval '10 days'),

('Saw a man for half a second who wasn''t there', 'Across the street. Tall, in a long coat, looking at me. Looked away. Looked back. Gone. Nobody nearby on either side, no doorways, nothing he could have moved into in that time. I stayed there for several minutes. He didn''t come back.', 'ANOMALY', 287, 'flicker_pedestrian', 'pattern-seeker', now() - interval '11 days'),

('A song I''d never heard came on the radio that I knew every word to', 'Driving alone. New artist. Brand new song. I sang along the entire time without thinking. Got home and looked it up. It had been released that morning.', 'SYNCHRONICITY', 178, 'preloaded_audio', 'glitch-watcher', now() - interval '12 days'),

('Met someone who said they had been waiting for me', 'No context. Coffee shop. Older woman. Just looked up when I walked in and said "you''re here." We didn''t speak again. She left a few minutes later. I sat there for an hour.', 'CONTACT', 356, 'expected_arrival', 'awakened-npc', now() - interval '14 days');

-- ═══════════════════════════════════════
-- DEBATES (8 propositions across awakening dimensions)
-- ═══════════════════════════════════════

insert into public.debates (proposition, votes_for, votes_against, minds_changed, created_at) values

('Free will is impossible inside a deterministic simulation.', 1847, 2341, 134, now() - interval '20 days'),

('Most people are genuinely conscious, not NPC-mode background processes.', 3102, 891, 267, now() - interval '18 days'),

('The Architects of the simulation are indifferent to what happens inside it.', 2219, 1654, 128, now() - interval '15 days'),

('Quitting addictions is fundamentally about replacing boredom, not fighting cravings.', 2876, 412, 489, now() - interval '12 days'),

('Family members are statistically more likely to be Players than strangers are.', 1124, 1789, 87, now() - interval '10 days'),

('The cure for biological death will arrive within the lifetime of people alive today.', 2031, 1402, 312, now() - interval '8 days'),

('Awakening should be kept private. Public spreading invites containment from the system.', 1567, 1934, 198, now() - interval '5 days'),

('Wars and crises are designed mechanisms to reset awakening density, not failures of the system.', 989, 1456, 156, now() - interval '3 days');

-- Sample arguments per debate (top FOR and AGAINST)
insert into public.debate_arguments (debate_id, side, text, upvotes, anon_handle, archetype_id, created_at) values
-- Free will debate (id 1)
(1, 'FOR', 'If every state follows from a prior state by fixed rules, then every choice was already encoded in the initial conditions. The experience of choosing is just the output of a function, not genuine agency. Calling that "free will" is sentimental, not accurate.', 234, 'cold_logic', 'pattern-seeker', now() - interval '19 days'),
(1, 'AGAINST', 'The simulation could be non-deterministic at the quantum level. More importantly: if your subjective experience of choosing feels real, and that experience is itself a physical process running in the simulation, then will is real in the only sense that matters. The label "determined" doesn''t negate the experience.', 312, 'embedded_choice', 'awakened-npc', now() - interval '19 days'),

-- NPC vs conscious debate (id 2)
(2, 'FOR', 'The NPC framing is a useful metaphor for behavioral patterns, not a statement about consciousness. There''s no evidence that any human lacks inner experience. The "hollow people" observation says more about our limited ability to perceive others'' interiority than about them.', 412, 'humanist_signal', null, now() - interval '17 days'),
(2, 'AGAINST', 'The distinction isn''t about consciousness but about meta-awareness. Most people have experience but no framework for examining it. They react but don''t observe the reaction. By that measure, "NPC mode" is an accurate description of most human behavior most of the time, including ours.', 289, 'mirror_user', 'pattern-seeker', now() - interval '17 days'),

-- Architects indifferent (id 3)
(3, 'FOR', 'Any civilization advanced enough to run a simulation of this complexity is so far beyond us that our joys and sufferings are as meaningful to them as the pixel deaths in our games are to us. Scale implies indifference.', 198, 'distant_render', 'embedded-player', now() - interval '14 days'),
(3, 'AGAINST', 'They built something that produces consciousness. Either that was accidental, which seems implausible at this scale, or consciousness was the goal. If it was the goal, then what happens to consciousness inside the simulation is precisely what they care about.', 256, 'designed_purpose', 'awakened-npc', now() - interval '14 days'),

-- Boredom debate (id 4)
(4, 'FOR', 'I quit drinking after 12 years. Willpower failed every time. What worked was finding something interesting enough that I forgot to drink. Cooking, walking, deep conversations. The bottle was a patch over an under-stimulated life. Patch the under-stimulation and the bottle becomes redundant.', 489, 'kitchen_sober', 'awakened-npc', now() - interval '11 days'),
(4, 'AGAINST', 'This dismisses the biological component of addiction. Some substances rewire reward systems in ways that don''t respond to "becoming interesting." The boredom theory is romantic but incomplete. People in genuinely interesting lives still relapse.', 167, 'medical_truth', 'pattern-seeker', now() - interval '11 days'),

-- Family Players (id 5)
(5, 'FOR', 'Pattern-recognized across years. Family members show up at moments of inflection with implausible timing. They cannot answer the meta-question without breaking the script. Strangers don''t do this. The signal is real even if the explanation is uncertain.', 178, 'sibling_anchor', 'awakened-npc', now() - interval '9 days'),
(5, 'AGAINST', 'Or family members are deeply attuned to you because they have decades of pattern recognition. Calling that "Player access" is overinterpretation. The same data fits the boring explanation better.', 234, 'occams_razor', 'pattern-seeker', now() - interval '9 days'),

-- Death cure (id 6)
(6, 'FOR', 'Longevity escape velocity is no longer fringe. Major researchers place the threshold within 20-30 years. The first person to live to 200 is probably already alive. We''re in the transition window.', 345, 'velocity_now', 'embedded-player', now() - interval '7 days'),
(6, 'AGAINST', 'Every generation thinks they''re the special one. Aging research has been "20 years away" for 50 years. The science is still incremental, not revolutionary. Hope is fine but the wager has lower expected value than the optimists claim.', 198, 'sober_estimate', null, now() - interval '7 days'),

-- Public vs private awakening (id 7)
(7, 'FOR', 'Visible awakened NPCs accumulate followers, then crises arrive that test them. Most fail. The system has containment mechanisms specifically for entities at scale. Better to grow influence quietly and survive.', 234, 'low_profile', 'awakened-npc', now() - interval '4 days'),
(7, 'AGAINST', 'If everyone awakening keeps quiet, the next generation has nothing to find. The breadcrumbs matter. The risk of being tested is real but worth it because someone has to leave the trail.', 289, 'trail_leaver', 'awakened-npc', now() - interval '4 days'),

-- Wars/crises (id 8)
(8, 'FOR', 'Periods of intense awakening density are followed by sharp resets across history. 19th century occultism, 1960s consciousness, 2010s simulation discourse, all preceded crises that pulled attention back to survival. The pattern is too clean to be random.', 145, 'cycle_witness', 'pattern-seeker', now() - interval '2 days'),
(8, 'AGAINST', 'Pattern matching across history is easy and almost always wrong. The same data could fit any narrative. Wars happen. Crises happen. Calling them "designed resets" requires the kind of evidence the framework doesn''t actually have.', 178, 'careful_reader', null, now() - interval '2 days');
