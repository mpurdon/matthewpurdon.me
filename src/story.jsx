/* matthewpurdon.me — The scenic route: the full origin story. Linked only from About. */
import DS from './ds/index.js';
import { kicker, pad } from './shared.jsx';

const { Prose, Soapbox, Callout, PullQuote } = DS;

export default function Story({ t, go }) {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 32px 96px' }}>
      <section style={{ padding: pad(t, '64px 0 40px', '44px 0 30px'), borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', color: kicker(t), margin: '0 0 12px' }}>Origin story · The long version</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 14px', color: 'var(--text-primary)' }}>The scenic route</h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 600, margin: 0 }}>
          People ask how I got into this. The short answer is a kitchen computer. This is the long
          answer.
        </p>
      </section>

      <section style={{ padding: pad(t, '40px 0', '28px 0') }}>
        <Prose style={{ maxWidth: 680 }}>
          <h2 style={{ marginTop: 0 }}>The kitchen computer</h2>
          <p>
            I grew up in the country, where the dump and the yard-sale table were our supply chain.
            Things came home broken, got opened up on the workbench, and turned into other things.
            My father was an amazing tinkerer (the kind who looks at a pile of leftover parts and
            sees a machine in it), and it rubbed off; that workbench taught me more than school
            ever did, including the rule I still run on: TIAS. Try It And See.
          </p>
          <p>
            I got my first taste of computers in the primary grades and wanted one with the kind of
            want that reorganizes a kid's life. There was no money for that, so I built electronics
            out of scavenged parts in the meantime, and mowed lawns and took every odd job going
            until I could buy the real thing.
          </p>
          <p>
            The computer lived in the kitchen. With the whole house awake it was too distracting to
            actually learn anything, so I'd wait everyone out and learn at night. People ask why
            I'm still up at 3 a.m.; the honest answer is that the kitchen finally got quiet around
            eleven, and the habit never left.
          </p>
          <PullQuote cite="Matthew Purdon">
            The kitchen finally got quiet around eleven, and the habit never left.
          </PullQuote>

          <h2>Two semesters and most of a bootcamp</h2>
          <p>
            I woke up on New Year's Day when I was twenty-two and told my mother I was moving to
            Toronto to go to school. The following Monday (January 5th, 1998) I got in my car and
            drove to the Seneca campus. I didn't actually have anywhere to stay, so the first
            three nights I slept in the car; then my Aunt Pat took me in until I got my feet
            under me. I've always just believed that things work out if you take the first step,
            and that you should never make a decision out of fear: figure out the worst thing
            that could happen and work back from there.
          </p>
          <p>
            Computer Information Systems was full, so I enrolled in
            electronics instead: it had the biggest overlap of courses, and I could switch into
            programming in second semester. Electronics is also where I met a good friend who went
            on to shape a huge part of my life. We were both poor as shit with nothing else to do,
            so we competed at everything there was: best grades, prettiest soldering, cleanest
            breadboard wiring.
          </p>
          <p>
            The switch into programming worked, and it was brutal in a way I hadn't planned for.
            I'd been coding for almost ten years by then, and four more years of "what is a
            variable" (billed to a student debt I could already feel compounding) was more than I
            could stomach. I jumped to one of those sketchy eight-month schools (it would probably
            be a bootcamp these days) and didn't finish that either.
          </p>

          <h2>Deathmatch during lectures</h2>
          <p>
            What the sketchy school actually gave me was a crew. A handful of us spent class
            playing Quake II over the LAN and ignoring whatever the instructor was going on about;
            the lab had the one thing none of us had at home (a room full of matching machines on
            real ethernet), and we put it to its true purpose.
          </p>
          <Callout variant="note" title="The LAN, 1998">
            Doom invented the deathmatch in 1993 and ran it over IPX, a Novell protocol most
            people only ever met in a computer lab. Quake II shipped in December 1997 speaking
            TCP/IP natively and played beautifully online, except home internet was a 56k modem
            with triple-digit ping. A school lab was the one place a broke student touched wired
            ethernet and a room of identical Pentiums; every computer course in the country was
            secretly a LAN party.
          </Callout>
          <p>
            One of those guys found out I could code in C and wondered if I could write him a
            program. I stopped playing games and worked to squeeze every nanosecond out of "pulse"
            (the name of the program): dropped to assembly for the inner loop, unrolled the hot
            paths, swapped the expensive math for lookup tables, threaded it, the whole deal. It
            was fast.
          </p>
          <Callout variant="note" title="Under the hood">
            In 1998 the compiler was not your friend. A Pentium could issue two instructions per
            clock, but only when consecutive instructions obeyed its pairing rules, so a
            hand-scheduled assembly inner loop genuinely beat anything C would emit. The rest was
            the standard playbook of the era: unroll the loop so the branch stops costing you,
            precompute the expensive math into lookup tables, keep the hot data small enough to
            stay in L1, and measure with <code>RDTSC</code> because your gut is a liar about
            performance.
          </Callout>
          <p>
            Pulse introduced me to a whole other group of friends, and we went on a lot of digital
            adventures together. But all of that led to the job: one of the Quake guys had an
            uncle who could get me in somewhere doing email support on the night shift, in an
            industry my church-lady mother would not approve of (also the only corner of the early
            internet that reliably made money). That was the actual door. I talked shop with the
            engineers, picked up Perl and sysadmin work, and moved into coding by sheer brute
            force and ignorance.
          </p>

          <h2>The island years</h2>
          <p>
            In early May 2003 my college buddy called. He'd gone off to try being a rock-climbing
            instructor, come back to Toronto, been my roommate for a while, and was now living in
            St. Vincent (wherever that was). He wanted to know if I'd move down and start a
            business with him doing "web stuff". I had just gotten my tax return, and the math said
            I could live down there for six months, pay the minimums on my credit card, and still
            afford the flight home. I quit my job and landed in Barbados two weeks later. The
            six-month plan lasted three years, until we'd each met someone, and I miss that life
            almost every day; twenty years back in the rat race hasn't dulled it.
          </p>
          <Callout variant="note" title="What I actually miss">
            Nobody down there was optimizing a career. Family and the people around you were the
            thing that mattered; money was for what it could do that week, not a scoreboard. The
            weather was great and I loved the surfing, but what I actually miss are the weekend
            limes with my buddy's family on a beach you could only reach by water, the whole
            island packing up for Easter Regatta in Bequia, and Vincy Mas, carnival season, when
            St. Vincent stops pretending to work at all.
          </Callout>

          <h2>The springboard</h2>
          <p>
            The business we started down there kept some money coming in after I got home, which
            bought me time, and then the same buddy called again: he'd just started at a place
            called Schematic, and there was a seat for me. That job was the springboard for
            everything since. I've worked on and off with people I met there across several gigs
            and two decades, and it's why I can honestly say I have never interviewed for a job in
            twenty-five years. Have a chat with the engineering manager, talk to the CTO, start the
            next week.
          </p>
          <Callout variant="takeaway" title="Twenty-five years, zero interviews">
            Every job since the night shift came through someone who had already watched me work.
            Forget the resume polish and the leetcode grind; the durable career asset is people
            who would ship with you again.
          </Callout>

          <h2>Everything changes again</h2>
          <Soapbox variant="aside" label="Hot take" title="Nobody counts cycles" signoff="still timing things for fun">
            <p>
              Of everything the industry shed on the way here, cycle counting is the one I miss.
              We used to fight a compiler for nanoseconds; now a chat app ships an entire browser
              to render a text box and nobody blinks ... brutal. I get why (developer time costs
              more than CPU time, I do the math too), but pulse-era me would not believe what we
              let a login form cost.
            </p>
          </Soapbox>
          <p>
            Now AI is bringing the biggest upheaval the industry has seen, and honestly, I'm fine
            with it. I've been through the browser wars, Y2K, the dot-com crash, Flash versus
            Jobs, the years when design patterns were a religion, SOAP versus REST, tabs versus
            spaces, agile-with-a-capital-A, NoSQL versus everything, and the season every monolith
            had to apologize for not being microservices. For a self-directed learner this is just
            the next thing to learn. So much is changing that staying on top of it all is sometimes
            impossible, and it's fun as hell to try.
          </p>
        </Prose>

        <div style={{ display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap' }}>
          <a className="mp-btn mp-btn--outline mp-btn--md" href="/about"
             onClick={go ? (e) => { e.preventDefault(); go('about'); } : undefined}
             style={{ textDecoration: 'none' }}>← Back to About</a>
          <a className="mp-btn mp-btn--solid mp-btn--md" href="/notes"
             onClick={go ? (e) => { e.preventDefault(); go('notes'); } : undefined}
             style={{ textDecoration: 'none' }}>Read Field Notes</a>
        </div>
      </section>
    </main>
  );
}
