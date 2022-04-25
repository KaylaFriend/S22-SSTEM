<!DOCTYPE html>
<html>
    <head>
        <script src="main.js"></script>
        <style>
            tbody {
                size: 200px 200px;
            }
            tr {
                height: 12.5%;
                width: 100%;
            }

            tr:first-child td {
                border-top: 2px black solid;
            }

            tr td:first-child {
                border-left: 2px black solid;
            }

            td {
                width: 12.5%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <?php
            echo '<table>';
            echo '<tbody id="maze">';
            for ($i = 0; $i < 64; $i) {
                if ($i % 8 == 0) {
                    echo "<tr>";
                }
                echo "<td>&nbsp;</td>";
                if ($i++ % 8 == 7) {
                    echo "</tr>";
                }
            }
            echo '</tbody>';
            echo "</table>";
        ?>
        <a href="javascript:wait()">Click me!!!</a>
        <script>
            function wait() {
                var m = document.getElementById("maze");
                var c = m.children;
                var M = new Maze();
                for (var i = 0; i < c.length; ++i) {
                    var d = c[i].children;
                    for (var j = 0; j < d.length; ++j) {
                        var blockBitIndex = (i % 2) * 16 + (j * 2);
                        // getBits(M.maze[i / 2], blockBitIndex, blockBitIndex + 1)
                        var blocks = (M.maze[i / 2] << (30 - blockBitIndex)) >>> 30;
                        console.log(blocks);
                        if ((blocks & 1) == 0) {
                            d[j].style.borderRight = "2px black solid";
                        } else {
                            d[j].style.borderRight = "none";
                        }
                        if ((blocks & 2) == 0) {
                            d[j].style.borderBottom = "2px black solid";
                        } else {
                            d[j].style.borderBottom = "none";
                        }
                    }
                }
            }
        </script>
    </body>
</html>