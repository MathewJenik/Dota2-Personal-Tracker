1. [x] User login
2. [ ] Access to games of player from dota 2 api
3. [ ] Custom player information based off each in game hero.
4. [ ] Collection of dota 2 item and hero data
5. [ ] Dota 2 Patch Notes section
6. [x] Hero Description pages
7. [x] Item Description pages
8. [] Item Editing
9. [] Hero Editing
10. [x] Ability Description
11. [] Ability Editing
12. [] Item Creation
13. [] Hero Creation
14. [] Ability Creation
15. [] User Editing
16. [] User Creation
17. [] Role based Access + Auth
18. [] Admin dashboard
19. [] player dashboard
20. [] Auto update clients instance (cookies etc) when settings have been changed (important details such as dota ID).


Potential Names:
Dota 2 Insight
Dota 2 Oversight

Database:
User:
- username
- password
- role


Hero:
- name
- description
- primaryAttribute
- imageLoc
- abilites


PlayersHero?? (this is where data from how well a player plays a hero):
- hero
- player
- winrate
- heroMatchup
- patch

heromatchup (this is a players hero matchup)
- player
- hero
- opposinghero
- winrate
- patch

heroitem (this is a players, hero item matchup)
- player
- hero
- item
- winrate
- patch

item:
- name
- cost
- alterations
- description
- upgradePath
- predecessorPath
- imageLoc
- active

- ability:
