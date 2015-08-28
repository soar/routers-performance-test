#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}

removefiles=(
  ".*\.tst"
  ".*\.html"
  ".*_conn_established\.gif"
  ".*_consec_lost_legend\.gif"
  ".*_fin_ack_received\.gif"
  ".*_fin_ack_sent\.gif"
  ".*_fin_received\.gif"
  ".*_fin_sent\.gif"
  ".*_max_consec_lost_legend\.gif"
  ".*_resp_time_legend\.gif"
  ".*_rst_received\.gif"
  ".*_rst_sent\.gif"
  ".*_syn_failed\.gif"
  ".*_syn_received\.gif"
  ".*_syn_sent\.gif"
  ".*_tcp_retransmissions\.gif"
  ".*_tcp_timeouts\.gif"
  ".*_throughput_legend\.gif"
  ".*_trans_rate_legend\.gif"
  ".*_video_df_legend\.gif"
  ".*_video_mlr_legend\.gif"
)

for removefile in "${removefiles[@]}"; do
  find ${DIR} -type f -regex "${removefile}" -exec echo "Found file: {}, removed..." \; -execdir rm {} \;
done
