// 公开展示的代表论文。仅收录本地材料中已经正式发表的成果。
// 摘要来自论文原文或本地检索记录；仅填写已核对且可公开访问的代码仓库。
window.publications = [
  {
    year: 2026, venue: 'Information Sciences', type: 'JOURNAL', category: 'multimodal',
    title: 'Attribute-calibrated local embeddings for prompt learning in vision-language models',
    role: '通讯作者',
    abstract: `Parameter-efficient prompt learning is an effective strategy for adapting Vision-Language Models (VLMs) to downstream tasks. However, most existing methods rely solely on a single global image representation, overlooking valuable fine-grained details. Because standard VLM pre-training primarily aligns text with global embeddings, raw patch-level features within the vision encoder are often noisy and lack local discriminative power. To address this limitation, we introduce ACLE-Prompt, a novel framework that generates Attribute-Calibrated Local Embeddings (ACLE) to enrich local representations for prompt learning. Rather than directly using isolated and noisy patches, ACLE-Prompt employs a dynamic memory bank that aggregates high-quality, cross-sample patch exemplars from a frozen vision encoder. For each input image, a sparse multi-head cross-attention mechanism retrieves relevant exemplars from this memory to calibrate and refine the input image's local patch features. We further adopt a synergistic dual-branch framework, where a global branch maintains holistic alignment and a local branch learns prompts directly from these calibrated embeddings. Extensive experiments on 11 benchmarks show that ACLE-Prompt achieves a new state-of-the-art average 16-shot accuracy of 84.3%, outperforming the existing methods and exhibiting strong robustness in fine-grained classification, few-shot learning, and domain generalization.`,
    abstractSource: 'https://doi.org/10.1016/j.ins.2026.123707'
  },
  {
    year: 2025, venue: 'Frontiers of Information Technology & Electronic Engineering', type: 'JOURNAL', category: 'audio',
    title: 'Dynamic prompting class distribution optimization for semi-supervised sound event detection',
    role: '第一作者',
    abstract: `Semi-supervised sound event detection (SSED) tasks typically leverage a large amount of unlabeled and synthetic data to facilitate model generalization during training, reducing overfitting on a limited set of labeled data. However, the generalization training process often encounters challenges associated with noise interference introduced by pseudo-labels or domain knowledge gaps. To alleviate noise interference in class distribution learning, we propose an efficient semi-supervised class distribution learning method through dynamic prompt tuning, named Prompting clAss Distribution Optimization (PADO). Specifically, when modeling real labeled data, PADO dynamically incorporates independent learnable prompt tokens to explore prior knowledge about the true distribution. Then, the prior knowledge serves as prompt information, dynamically interacting with the posterior noisy class distribution information. In this case, PADO achieves class distribution optimization while maintaining model generalization, leading to a significant improvement in the efficiency of class distribution learning. Compared with state-of-the-art (SOTA) methods on the DCASE 2019, 2020, and 2021 challenge SSED datasets, PADO demonstrates significant performance improvements. Furthermore, it is ready to be extended to other benchmark models.`,
    abstractSource: 'https://doi.org/10.1631/FITEE.2400061'
  },
  {
    year: 2024, venue: 'IEEE/ACM TASLP', type: 'JOURNAL', category: 'audio',
    title: 'On Local Temporal Embedding for Semi-Supervised Sound Event Detection',
    role: '第一作者',
    abstract: `Semi-supervised sound event detection (SSED) task requires recognizing the categories of events and marking each event's onset and offset times in a mixed audio recording using a small amount of weakly labeled and a large scale of unlabeled data. So, exploring local temporal information, i.e., local discrimination and local correlations in the time domain, is essential for SSED, and in particular, for precise event boundary detection. Besides, as manual-labeled datasets are scarce, SSED tasks require effectively exploiting unlabelled data to reduce overfitting, typically through regularization techniques. Recently, self-supervised learning provided a viable solution to leverage unlabeled data for effective feature learning in various downstream tasks. In this paper, we propose LTE-Net, a novel multitask framework, to learn the Local Temporal Embedding for SSED. Specifically, LTE-Net first locally down-samples the input spectrogram and learns the token embeddings with a high temporal resolution (i.e., local discrimination). Then, LTE-Net effectively models the local correlations among the token embeddings through self-supervised masked spectrogram modeling. Finally, a novel joint (self- and semi-supervision) regularization framework is employed for the training of LTE-Net to effectively leverage unlabeled data in SSED. Extensive experiments on DCASE 2019, 2020 and 2021 SSED datasets show that LTE-Net significantly outperformed existing methods and achieved 2.1% to 8.7%, 2.1% to 3.9% and 1.2% to 6.1% performance gains on the evaluation set in 2019, 2020 and 2021 datasets, respectively.`,
    abstractSource: 'https://doi.org/10.1109/TASLP.2024.3369529'
  },
  {
    year: 2023, venue: 'INTERSPEECH', type: 'CONFERENCE', category: 'audio',
    title: 'Joint-Former: Jointly Regularized and Locally Down-sampled Conformer for Semi-supervised Sound Event Detection',
    role: '第一作者',
    abstract: `Semi-supervised Sound Event Detection (SSED) is to recognize the categories of events and mark their onset and offset times using a small amount of weakly-labeled and a large-scale of unlabeled data. To exploit unlabeled data effectively and reduce over-fitting, regularization techniques play a critical role in SSED. In this paper, we proposed a novel jointly regularized and locally down-sampled Conformer (Joint-Former) model for SSED. Joint-Former first locally down-samples the spectrogram and learns the token representations with high temporal resolution and low computational cost. Then, Joint-Former effectively exploits unlabelled data in SSED by integrating Mean-Teacher and Masked Spectrogram Modeling using joint regularization through a multitask learning framework. Extensive experiments on DCASE 2019, DCASE 2020, and DCASE 2021 task4 SSED datasets show that Joint-Former greatly outperformed existing methods.`,
    codeUrl: 'https://github.com/mastergofujs/Joint-Former'
  },
  {
    year: 2022, venue: 'ACM Multimedia', type: 'CONFERENCE', category: 'audio',
    title: 'Adaptive Hierarchical Pooling for Weakly-supervised Sound Event Detection',
    role: '第一作者',
    abstract: `In Weakly-supervised Sound Event Detection (WSED), the ground truth of training data contains the presence or absence of each sound event only at the clip-level (i.e., no frame-level annotations). Recently, WSED has been formulated under the multi-instance learning framework, and a critical component within this formulation is the design of the temporal pooling function. In this paper, we propose an adaptive hierarchical pooling (HiPool) for WSED, which combines the advantages of max pooling in audio tagging and weighted average pooling in audio localization through a novel hierarchical structure and learns event-wise optimal pooling functions through continuous relaxation-based joint optimization. Extensive experiments on benchmark datasets show that HiPool outperforms the current pooling methods and greatly improves the performance of WSED. HiPool also has great generality - ready to be plugged into any WSED models.`,
    abstractSource: 'https://doi.org/10.1145/3503161.3548097',
    codeUrl: 'https://github.com/mastergofujs/HiPool'
  },
  {
    year: 2021, venue: 'ACM Multimedia', type: 'CONFERENCE', category: 'audio',
    title: 'Reproducibility Companion Paper: On Learning Disentangled Representation for Acoustic Event Detection',
    role: '第一作者',
    abstract: `This companion paper is provided to describe the major experiments reported in our paper "On Learning Disentangled Representation for Acoustic Event Detection" published in ACM Multimedia 2019. To make the replication of our work easier, we first give an introduction of the computing environment where all of our experiments are conducted. Furthermore, we provide an environmental configuration file to setup the compiling environment and other artifacts including the source code, datasets and the files generated during our experiments. Finally, we summarize the structure and usage of the source code. For more details, please consult the README file in the archive of artifacts on GitHub: https://github.com/mastergofujs/SED_PyTorch.`,
    abstractSource: 'https://doi.org/10.1145/3474085.3477938',
    codeUrl: 'https://github.com/mastergofujs/SED_PyTorch'
  }
];
